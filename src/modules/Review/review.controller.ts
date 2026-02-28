import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { ReviewService } from "./review.service";
import sendResponse from "../../utils/sendResponse";

const createReview = asyncHandler(async (req:Request, res: Response) => {
    const userId = req.user?.id;
    console.log(userId);
    const payload = req.body

    const result = await ReviewService.createReviewService(userId, payload);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "review created successfully",
        data: result
    })
})

export const ReviewController = {
    createReview
};