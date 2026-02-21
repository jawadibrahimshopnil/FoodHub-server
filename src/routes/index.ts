import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { UserRoutes } from "../modules/User/user.route";

const router = Router();

const routerManager = [
   {
      path: "/auth",
      route: AuthRoutes
   },
   {
      path: "/user",
      route: UserRoutes
   }
];

routerManager.forEach((r) => router.use(r.path, r.route));

export default router;