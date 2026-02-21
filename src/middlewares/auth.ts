import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { prisma } from "../lib/prisma";
import { userRole } from "../../generated/prisma/enums";
import config from "../config";

const auth = (...roles: userRole[]) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      try {
         // IS TOKEN EXISTS
         const token = req.headers.authorization;

         if (!token) {
            throw new Error("Token not found!");
         }

         // VERIFY IT
         const decoded = jwt.verify(token, config.jwtSecret!) as JwtPayload;

         // IS DECODED USER EXISTS
         const userData = await prisma.user.findUnique({
            where: {
               email: decoded.email
            }
         })

         if (!userData) {
            throw new Error("User not Found!");
         }

         // IS USER ACTIVE
         if(userData.status !== "ACTIVATE"){
            throw new Error("User is suspended!");
         }

         // CHECK ROLE
         if (roles.length && !roles.includes(userData.role)) {
            throw new Error("Unauthorized !!!");
         }

         const {password, ...newUserData} = userData;

         req.user = newUserData;

         next();

      } catch (error) {
         next(error);
      }
   }
}


export default auth;

