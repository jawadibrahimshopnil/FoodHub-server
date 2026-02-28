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

const updateCategoryService = async (
  categoryId: string,
  payload: Record<string, any>
) => {

  const slug = createSlug(payload.name);

  return prisma.category.update({
    where: {
      id: categoryId
    },
    data: {
      name: payload.name,
      slug
    }
  });
};

export const CategoryService = {
    createCategoryService,
    updateCategoryService
};