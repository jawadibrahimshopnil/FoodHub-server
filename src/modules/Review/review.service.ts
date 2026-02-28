import { prisma } from "../../lib/prisma";

type CreateReviewPayload = {
  mealId: string;
  comment: string;
};
const createReviewService = async (
  userId: string,
  payload: CreateReviewPayload
) => {
  const orderExists = await prisma.orderItem.findFirstOrThrow({
    where: {
      mealId: payload.mealId,
      order: {
        userId: userId,
      }
    }
  });

  if (!orderExists) {
    throw new Error("User cannot review without purchasing and receiving meal");
  }

  return prisma.review.create({
    data: {
      comment: payload.comment,
      userId,
      mealId: payload.mealId
    }
  });
};

export const ReviewService = {
    createReviewService
};