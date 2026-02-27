import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createProviderService = async (payload: Prisma.ProviderUncheckedCreateInput) => {
    return await prisma.provider.create({
        data: {
            ...payload
        }
    });
}

const getAllProvidersService = async () => {
    return await prisma.provider.findMany({})
}

const getProviderByIdService = async (providerId: string) => {
    return await prisma.provider.findUniqueOrThrow({
        where: {
            id: providerId
        },
        include:{
            meals: {
                include:{
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
            }
        }
    })
}

export const ProviderService = {
    createProviderService,
    getAllProvidersService,
    getProviderByIdService
};