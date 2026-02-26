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
    return await prisma.meal.findFirstOrThrow({
        //TODO: GET AND REVIEW
        where: {
            id: mealId
        },
        include:{
            mealDietaries: {
                select: {
                    dietary:{
                        select:{
                            name: true
                        }
                    }
                }
            }
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