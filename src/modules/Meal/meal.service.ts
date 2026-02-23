import { Meal, Prisma, Provider } from "../../../generated/prisma/client";
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

const updateMealService = async (userId: string, mealId: string, payload: Omit<Prisma.MealUpdateInput, 'id' | 'providerId'>) => {
    return await prisma.meal.updateMany({
        where: {
            id: mealId,
            provider: {
                userId
            }
        },
        data: payload
    })
}

export const MealService = {
    createMealToDB,
    getMealByIdService,
    updateMealService
};