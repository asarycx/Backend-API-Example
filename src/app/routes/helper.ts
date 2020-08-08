import { Router } from "express";
import { checkJwt } from "@middlewares/checkJwt";

import roleSelect from "@helper/roleSelect";
import roleGrouped from "@helper/roleGrouped";

const router = Router();

// Helper Route
router.get("/select_role", [checkJwt], roleSelect);
router.get("/select_role_grouped", [checkJwt], roleGrouped);

export default router;
