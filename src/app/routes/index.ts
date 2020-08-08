import { Router } from "express";
import auth from "./auth";
import user from "./user";
import role from "./role";
import helper from "./helper";

const routes = Router();

/**
 * Combine all routes
 */
routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/role", role);
routes.use("/helper", helper);

export default routes;
