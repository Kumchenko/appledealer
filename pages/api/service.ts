import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { IServiceReqData } from "./interfaces";

interface IServiceRequest extends NextApiRequest {
    body: IServiceReqData
}

const handler = async (req: IServiceRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'POST') {
            throw Error("Sorry, we support only POST method!");
        }
        const { model, component, quality } = req.body;
        const service = await prisma.service.findUnique({
            where: {
                modelId_componentId_qualityId: {
                    modelId: model,
                    componentId: component,
                    qualityId: quality
                }
            },
            select: {
                id: true,
                cost: true
            }
        })
        return res.status(200).json(service);
    }
    catch (error: any) {
        return res.status(400).json({Error: error.message});
    }
}

export default handler;