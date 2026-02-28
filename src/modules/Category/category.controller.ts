import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { CategoryService } from "./category.service";
import sendResponse from "../../utils/sendResponse";

const createCategory = asyncHandler(async (req:Request, res:Response) => {
    const payload = req.body
    const result = await CategoryService.createCategoryService(payload)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Category created successfully",
        data: result
    })
})

const updateCategory = asyncHandler(async (req:Request, res:Response) => {
    const payload = req.body;
    const categoryId = req.params.categoryId as string;

    const result = await CategoryService.updateCategoryService(categoryId, payload)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Category created successfully",
        data: result
    })
})

export const CategoryController = {
    createCategory,
    updateCategory
};
