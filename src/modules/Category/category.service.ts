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

const deleteCategoryService = async (categoryId: string) => {

  const relationCount = await prisma.meal_Category.count({
    where: {
      categoryId
    }
  });

  if (relationCount > 0) {
    throw new Error("Category is used in meals");
  }

  return prisma.category.delete({
    where: {
      id: categoryId
    }
  });
};

export const CategoryService = {
    createCategoryService,
    updateCategoryService,
    deleteCategoryService
};