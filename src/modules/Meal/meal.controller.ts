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
    console.log(`getMealById hited : ${mealId}`);

    const result = await MealService.getMealByIdService(mealId);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Meal created successfully",
        data: result
    });

})

export const MealController = {
    createMeal,
    getMealById
};