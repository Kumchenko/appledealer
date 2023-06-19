import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { ICallReqData } from "./interfaces";

interface ICallRequest extends NextApiRequest {
    body: ICallReqData
}

const handler = async (req: ICallRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'POST') {
            throw new Error("Sorry, we support only POST method!");
        }
        const { name, tel } = req.body;
        const createdCall = await prisma.callMe.create({
            data: {
                name,
                tel
            }
        })
        return res.status(200).json(createdCall);
    }
    catch (error: any) {
        return res.status(400).json({Error: error.message});
    }
}

export default handler;