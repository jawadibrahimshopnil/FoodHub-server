import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { OrderService } from "./order.service";
import sendResponse from "../../utils/sendResponse";

const createOrder = asyncHandler(async (req:Request, res: Response) => {
    const userId = req.user?.id;
    console.log(userId);
    const payload = req.body

    const result = await OrderService.createOrderDB(userId, payload);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Order created successfully",
        data: result
    })
})

const viewProviderOrders = asyncHandler(async (req:Request, res: Response) => {
    const userId = req.user?.id;

    const result = await OrderService.viewProviderOdersDB(userId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Orders retrived successfully",
        data: result
    })
})

export const OrderController = {
    createOrder,
    viewProviderOrders
};