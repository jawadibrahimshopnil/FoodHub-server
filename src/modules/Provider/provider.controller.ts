import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { ProviderService } from "./provider.service";
import sendResponse from "../../utils/sendResponse";

const createProvider = asyncHandler(async (req:Request, res:Response) => {
    const reqData = req.body;
    const userId = req.user?.id;

    const payload = {
        userId,
        ...reqData
    }

    const result = await ProviderService.createProviderService(payload);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Provider Created",
        data: result
    });
})

export const ProviderController = {
    createProvider
};