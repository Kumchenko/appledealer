import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { IComponentsReqData } from "./interfaces";

interface IComponentsRequest extends NextApiRequest {
    body: IComponentsReqData
}

const handler = async (req: IComponentsRequest, res: NextApiResponse) => {
    try {
        const { model } = req.body;
        if (!model) {
            res.status(400).json([]);
        }
        const components = await prisma.component.findMany({
            where: {
                services: {
                    some: {
                        modelId: model
                    }
                }
            }
        })
        return res.status(200).json(components);
    }
    catch (error: any) {
        return res.status(400).json({Error: error.message});
    }
}

export default handler;