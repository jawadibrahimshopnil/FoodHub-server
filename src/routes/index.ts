import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { UserRoutes } from "../modules/User/user.route";
import { MealRoutes } from "../modules/Meal/meal.route";
import { ProviderRoutes } from "../modules/Provider/provider.route";

const router = Router();

const routerManager = [
   {
      path: "/auth",
      route: AuthRoutes
   },
   {
      path: "/users",
      route: UserRoutes
   },
   {
      path: "/meals",
      route: MealRoutes
   },
   {
      path: "/providers",
      route: ProviderRoutes
   },
];

routerManager.forEach((r) => router.use(r.path, r.route));

export default router;