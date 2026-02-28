import { Prisma, Provider } from "../../../generated/prisma/client";
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
                    },
                }
            },
            reviews: true
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

const getALlMealsService = async (filters: Record<string, any>) => {

    const {cuisine, price, page, limit} = filters;

    let {dietary} = filters;
    if(dietary && !Array.isArray(dietary)) dietary = [dietary]

    const p = Number(page) || 1;
    const l = Number(limit) || 5;
    const sortOrder = price  === 'desc' ? 'desc' : 'asc'; 

    const skip = (p - 1 ) * l

    let where:Prisma.MealWhereInput = {}

    if (cuisine) where.cuisine = { equals: cuisine, mode: 'insensitive'}

    if (dietary) {
        where.mealDietaries = {
            some: {
                dietary: {
                    name: {
                        in: dietary,
                        mode: 'insensitive'
                    }
                }
            }
        }
    }

    return await prisma.meal.findMany({
        where,
        orderBy: { price: sortOrder},
        skip: skip,
        take: l,
        include: {
            provider: {
                select: {
                    name: true,
                    address: true
                }
            },
            mealDietaries: {
                select: {
                    dietary: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })
}

export const MealService = {
    createMealToDB,
    getMealByIdService,
    updateMealService,
    getALlMealsService
};