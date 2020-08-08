import { Router } from "express";
import { checkJwt } from "@middlewares/checkJwt";

import Login from "@auth/login";
import Me from "@auth/me";

const router = Router();

// Login route
router.post("/login", Login);

// Self route
router.get("/me", [checkJwt], Me);

export default router;
