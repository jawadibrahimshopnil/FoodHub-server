import Stripe from "stripe";
import config from "../../config";
import { CreateOrderPayload, listOderItems, OrderService } from "../Order/order.service"
import { prisma } from "../../lib/prisma";

export const stripeClient = new Stripe(config.stripe_key);

type IListOrderItems = {
    mealId: string;
    price: number;
    quantity: number;
}

const lineItems = (orders: IListOrderItems[]) => {
  return orders.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.mealId,
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));
};

const createCheckoutSessionService = async(payload: CreateOrderPayload, userId: string) => {

  const order = await OrderService.createOrderDB(userId, payload, "STRIPE");

   const listOrderItems = await listOderItems(payload);

   const lineOrderItems = lineItems(listOrderItems);
   
  const session = await stripeClient.checkout.sessions.create({
    line_items: lineOrderItems,
    mode: 'payment',
    success_url: `${config.frontend_url}/payments/success`,
    metadata: {
      orderId: order.id
    }
  });

  return session.url as string;

}


const handlerStripeWebhookEvent = async (event: any) => {
  if (event.type !== "checkout.session.completed") return;

  const session = event.data.object as Stripe.Checkout.Session;

  const orderId = session.metadata?.orderId;

  if (!orderId) throw new Error("Missing orderId");

  const result = await prisma.order.update({
    where: { id: orderId },
    data: {
      paymentStatus: "PAID"
    }
  });

  console.log("Order marked as PAID:", orderId);

  return {message : `Webhook Event ${event.id} processed successfully`}
};




export const paymentServices = {
   createCheckoutSessionService,
   handlerStripeWebhookEvent
}