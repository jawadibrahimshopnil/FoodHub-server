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

export const UserService = {
    getProfileFromDB
};