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

const getAllProviders = asyncHandler(async (req:Request, res:Response) => {
    const result = await ProviderService.getAllProvidersService();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All Providers",
        data: result
    });
})



export const ProviderController = {
    createProvider,
    getAllProviders,

};