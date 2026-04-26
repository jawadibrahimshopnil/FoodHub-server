import { Request, Response } from "express"
import asyncHandler from "../../utils/asyncHandler"
import sendResponse from "../../utils/sendResponse"
import { paymentServices, stripeClient } from "./payments.service";
import config from "../../config";

const createCheckoutSession = asyncHandler(async (req:Request, res: Response) => {
   const userId = req.user?.id;
   const payload = req.body;

   const url = await paymentServices.createCheckoutSessionService(payload, userId);

   sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Redirect url",
        data: { url }
    });
})

const handleStripeWebhookEvent = asyncHandler(async (req : Request, res : Response) => {
    const signature = req.headers['stripe-signature'] as string
    const webhookSecret = config.whsec_key;

    if(!signature || !webhookSecret){
        console.error("Missing Stripe signature or webhook secret");
        return res.status(400).json({message : "Missing Stripe signature or webhook secret"})
    }

    let event;

    try {
        event = stripeClient.webhooks.constructEvent(req.body, signature, webhookSecret);
    } catch (error : any) {
        console.error("Error processing Stripe webhook:", error);
        return res.status(400).json({message : "Error processing Stripe webhook"})
    }

    try {
        const result = await paymentServices.handlerStripeWebhookEvent(event);

        sendResponse(res, {
            statusCode : 200,
            success : true,
            message : "Stripe webhook event processed successfully",
            data : result
        })
    } catch (error) {
        console.error("Error handling Stripe webhook event:", error);
        sendResponse(res, {
            statusCode : 500,
            success : false,
            message : "Error handling Stripe webhook event"
        })
    }
})


export const paymentController = {
   createCheckoutSession,
   handleStripeWebhookEvent
}