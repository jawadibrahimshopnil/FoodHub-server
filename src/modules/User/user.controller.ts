import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

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

export const UserController = {
    getUserProfile
};