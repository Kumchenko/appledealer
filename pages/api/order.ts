import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { IOrderReqData, IServiceReqData, IServiceResData } from "./interfaces";

interface IOrderRequest extends NextApiRequest {
    body: IOrderReqData
}

const handler = async (req: IOrderRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'POST') {
            throw new Error("Sorry, we support only POST method!");
        }
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
    catch (error) {
        return res.status(400).json(error);
    }
}

export default handler;