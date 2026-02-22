import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { UserRoutes } from "../modules/User/user.route";
import { MealRoutes } from "../modules/Meal/meal.route";

const router = Router();

const routerManager = [
   {
      path: "/auth",
      route: AuthRoutes
   },
   {
      path: "/user",
      route: UserRoutes
   },
   {
      path: "/meal",
      route: MealRoutes
   },
];

routerManager.forEach((r) => router.use(r.path, r.route));

export default router;