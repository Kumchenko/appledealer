import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { IOrderReqBody, IOrderReqQuery, IServiceReqData, IServiceResData } from "./interfaces";
import { idToNumber } from "@/utils";

interface IOrderRequest extends NextApiRequest {
    query: IOrderReqQuery
    body: IOrderReqBody
}

const handler = async (req: IOrderRequest, res: NextApiResponse) => {
    try {
        switch (req.method) {
            case 'GET': {
                getHandler(req, res);
                break;
            }
            case 'POST': {
                postHandler(req, res);
                break;
            }
        }
    }
    catch (error) {
        return res.status(400).json(error);
    }
}

// Handler for GET (Reading Order)
const getHandler = async (req: IOrderRequest, res: NextApiResponse) => {
    // Destructuring query values
    const {
        id: idQuery,
        tel: telQuery
    } = req.query;

    // Getting order by ID, split order and service info
    const { service, Operation: operations, ...order } = await prisma.order.findUniqueOrThrow({
        where: {
            id: idToNumber(idQuery)
        },
        include: {
            Operation: {
                select: {
                    dateTime: true,
                    status: true
                }
            },
            service: {
                select: {
                    modelId: true,
                    qualityId: true,
                    componentId: true
                }
            }
        }
    })

    // Checking if telephone number is the same (authenticate user)
    if (order.tel === decodeURIComponent(telQuery)) {
        // Forming response
        return res.status(200).json({
            ...order,
            model: service.modelId,
            component: service.componentId,
            quality: service.qualityId,
            operations
        });
    } else {
        return res.status(200).json(null);
    }
}

// Handler for POST (Creating Order)
const postHandler = async (req: IOrderRequest, res: NextApiResponse) => {
    // Destructuring data of request
    const {
        model,
        name,
        surname,
        tel,
        email,
        component,
        quality
    } = req.body;

    // Requesting and getting serviceId and service's cost
    const serviceReqData: IServiceReqData = {
        model,
        component,
        quality
    }
    const serviceResponse = await fetch('http://localhost:3000/api/service', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(serviceReqData)
    });
    const service: IServiceResData = await serviceResponse.json();

    // Creating order in DB
    const createdOrder = await prisma.order.create({
        data: {
            serviceId: service.id,
            name,
            surname,
            tel,
            email,
            cost: service.cost
        }
    })

    // Returning data of created order
    return res.status(200).json({
        ...createdOrder,
        model,
        component,
        quality
    });
}

export default handler;