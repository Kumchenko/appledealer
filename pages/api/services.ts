import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { IServicesReqData } from "./interfaces";

interface IServicesRequest extends NextApiRequest {
    body: IServicesReqData
}

const handler = async (req: IServicesRequest, res: NextApiResponse) => {
    try {
        const { model, component } = req.body;
        if (!model || !component) {
            res.status(400).json([]);
        }
        const services = await prisma.service.findMany({
            where: {
                modelId: model,
                componentId: component
            },
            select: {
                id: true,
                quality: true,
                cost: true
            }
        })
        return res.status(200).json(services);
    }
    catch (error: any) {
        return res.status(400).json({Error: error.message});
    }
}

export default handler;