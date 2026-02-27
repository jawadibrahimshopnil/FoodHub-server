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



export const ProviderService = {
    createProviderService,
    getAllProvidersService,

};