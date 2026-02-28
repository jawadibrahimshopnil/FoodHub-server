import { OrderStatus, Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

type CreateOrderPayload = {
  address: string;
  items: {
    mealId: string;
    quantity: number;
  }[];
}
const createOrderDB = async (userId: string, payload:CreateOrderPayload) => {
    const result = prisma.$transaction(async (tx) => {

        // get meals
        const mealIds = payload.items.map(item => item.mealId);

        const meals = await tx.meal.findMany({
            where: {
                id: { in: mealIds}
            },
            select:{
                id: true,
                price: true,
                providerId: true
            }
        })

        if (meals.length !== payload.items.length) {
            throw new Error("Some meals not found");
        }

        // from same provider?
        const providerId = meals[0].providerId;

        const differentProvider = meals.some(
            meal => meal.providerId !== providerId
        );

        if (differentProvider) {
            throw new Error("All meals must belong to same provider");
        }

        // calc total price
        let totalPrice = 0;
        const oderItemsData = payload.items.map(item => {
            const meal = meals.find(m => m.id === item.mealId)!;
            const itemTotal = Number(meal.price) * item.quantity;

            totalPrice += itemTotal;

            return {
                mealId: meal.id,
                quantity: item.quantity,
            }
        })

        // createoder 
        const order = await tx.order.create({
            data: {
                address: payload.address,
                total_price: totalPrice,
                userId,
                providerId,
                orderItems: {
                    create: oderItemsData
                }
            },
            include: {
                orderItems: true
            }
        })

        return order;

    })
    return result
}

const viewProviderOdersDB = async (userId:string) => {
    const provider = await prisma.provider.findUniqueOrThrow({
        where: {
            userId 
        }
    })

    return await prisma.order.findMany({
        where: {
            providerId: provider.id
        },
        include: {
            orderItems: true
        }
    })
}

const getOrderByIdDB = async (orderId:string) => {
    return await prisma.order.findUniqueOrThrow({
        where: {
            id: orderId
        }
    })
}

const updateOrderStatusDB = async (userId: string, orderId:string, status:OrderStatus) => {
    const provider = await prisma.provider.findUniqueOrThrow({
        where: {
            userId 
        }
    })

    return await prisma.order.update({
        where: {
            id: orderId,
            providerId: provider.id
        },
        data: {
            status
        }
    })
}

export const OrderService = {
    createOrderDB,
    viewProviderOdersDB,
    getOrderByIdDB,
    updateOrderStatusDB
};