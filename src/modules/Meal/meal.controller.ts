import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { prisma } from "../../lib/prisma";
import { MealService } from "./meal.service";
import sendResponse from "../../utils/sendResponse";

const createMeal = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const provider = await prisma.provider.findUnique({
        where: {
            userId: userId
        }
    })

    if (!provider) {
        throw new Error("Provider profile not found. Please complete your profile first."); 
    }

    const result = await MealService.createMealToDB(provider, req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Meal created successfully",
        data: result
    })
})

const getMealById = asyncHandler(async (req: Request, res: Response) => {
    const mealId = req.params.mealId as string;

    const result = await MealService.getMealByIdService(mealId);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Meal created successfully",
        data: result
    });

})

const updateMealById = asyncHandler(async (req: Request, res: Response) => {
    const mealId = req.params.mealId as string;
    const userId = req.user?.id;
    const payload = req.body

    const result = await MealService.updateMealService(userId, mealId, payload);

    if(result.count === 0){
        throw new Error("Unauthorized or meal not found");
    }

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Meal updated successfully",
        data: result
    });
})

export const MealController = {
    createMeal,
    getMealById,
    updateMealById
};