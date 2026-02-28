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

const getOrderById = asyncHandler(async (req:Request, res: Response) => {
    const orderId = req.params.orderId as string;

    const result = await OrderService.getOrderByIdDB(orderId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Order retrived successfully",
        data: result
    })
})

const updateOrderStatus = asyncHandler(async (req:Request, res: Response) => {
    const orderId = req.params.orderId as string;
    const {status} = req.body;
    const userId = req.user?.id;

    const result = await OrderService.updateOrderStatusDB(userId, orderId, status);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Order status updated successfully",
        data: result
    })
})

export const OrderController = {
    createOrder,
    viewProviderOrders,
    getOrderById,
    updateOrderStatus
};