import { prisma } from "../../lib/prisma";
import { createSlug } from "../../utils/createSlug";

const createCategoryService = async (payload: Record<string, any>) => {

  const slug = createSlug(payload.name);

  return prisma.category.create({
    data: {
      name: payload.name,
      slug
    }
  });
};

export const CategoryService = {
    createCategoryService
};