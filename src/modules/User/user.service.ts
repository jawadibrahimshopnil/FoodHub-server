import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getProfileFromDB = async (data: any) =>{
    const result = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });

    if (!result) {
        throw new Error("User not found");
    }

    const {password, ...newResult} = result;

    return newResult;
} 

const updateUserService = async (userEmail: string, payload:Prisma.UserUncheckedUpdateInput) => {
    const {password, ...newResult} = await prisma.user.update({
        where:{
            email: userEmail
        },
        data: payload
    });

    return newResult;
}

export const UserService = {
    getProfileFromDB,
    updateUserService
};