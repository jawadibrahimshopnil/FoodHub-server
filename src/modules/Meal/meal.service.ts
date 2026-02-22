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

const getMealByIdService = async (mealId: string) => {
    console.log(`hitted getmealid service`);
    return await prisma.meal.findFirstOrThrow({
        where: {
            id: mealId
        }
    })
}

export const MealService = {
    createMealToDB,
    getMealByIdService
};