import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import asyncHandler from "../../utils/asyncHandler";

const getUserProfile = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getProfileFromDB(req.user);
        
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Successfull",
            data: result
        })
        
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Something went wrong!!",
            data: error,
        })
    }
}

const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const payload = req.body;
    const userEmail = req.user?.email;

    console.log(userEmail, payload);

    const result = await UserService.updateUserService(userEmail, payload);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "successfully updated user info",
        data: result
    });
})

export const UserController = {
    getUserProfile,
    updateUser
};