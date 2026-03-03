import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const createUser = async (req:Request, res: Response) => {
    try {
        console.log("hitted auth ctrl");
        const result = await AuthService.createUserInDB(req.body);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User created",
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

const loginUser = async (req:Request, res:Response) => {
    try {
        const result = await AuthService.loginUserInDB(req.body);
        
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Login Successfull",
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


export const AuthController = {
    createUser,
    loginUser
};