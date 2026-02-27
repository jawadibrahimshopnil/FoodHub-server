import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createProviderService = async (payload: Prisma.ProviderUncheckedCreateInput) => {
    return await prisma.provider.create({
        data: {
            ...payload
        }
    });
}

export const ProviderService = {
    createProviderService
};