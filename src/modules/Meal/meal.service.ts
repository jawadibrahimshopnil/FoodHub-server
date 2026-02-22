import { Provider } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createMealToDB = async({id}: Provider, payload: any) => {
    return await prisma.meal.create({
        data: {
            ...payload,
            providerId: id
        }
    })
}

export const MealService = {
    createMealToDB
};