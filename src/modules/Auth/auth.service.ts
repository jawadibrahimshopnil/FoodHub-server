import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";

const createUserInDB = async (payload: any) => {

    const hashPass = await bcrypt.hash(payload.password, 8);

    const result = await prisma.user.create({
        data: {...payload, password: hashPass}
    })

    const {password, ...newResult} = result;

    return newResult;
}

const loginUserInDB = async (payload:any) => {
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })

    if (!user) {
        throw new Error("User Not Found");
        
    }

    const isPassMatched = await bcrypt.compare(payload.password, user.password);

    if (!isPassMatched) {
        throw new Error("Invalid Credentials!");
    }

    const userData = {
        id: user.id,
        role: user.role,
        email: user.email
    }

    const token = jwt.sign(userData, process.env.JWTSECRET!, {expiresIn: "1d"});

    return {
        user,
        token
    }
}

export const AuthService = {
    createUserInDB,
    loginUserInDB
};