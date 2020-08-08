import { Router } from "express";
import { checkJwt } from "@middlewares/checkJwt";
import { checkPermission } from "@middlewares/checkPermission";
import { ValidateForm } from "@middlewares/ValidateForm";

// UseCases
import getAllRole from "@admin/role/useCase/getAllRoles";
import getOneRoleByID from "@admin/role/useCase/getOneRoleByID";
import updateRole from "@admin/role/useCase/updateRole";
import createRole from "@admin/role/useCase/createRole";
import deleteRole from "@admin/role/useCase/deleteRole";
import softDeleteRole from "@admin/role/useCase/softDeleteRole";
import recoverRole from "@admin/role/useCase/recoverRole";

import createRoleValidation from "@admin/role/validation/createRole";
import updateRoleValidation from "@admin/role/validation/updateRole";

const router = Router();

// Get all roles
router.get("/", [checkJwt, checkPermission(["read_role"])], getAllRole);

// Get One Specific role
router.get(
  "/:uuid",
  [checkJwt, checkPermission(["read_role"])],
  getOneRoleByID
);

// Create a new role
router.post(
  "/",
  [
    checkJwt,
    ...createRoleValidation,
    ValidateForm,
    // upload.none(),
    checkPermission(["create_role"]),
  ],
  createRole
);

// Delete role(s)
router.delete("/", [checkJwt, checkPermission(["delete_role"])], deleteRole);

// Soft Delete role(s)
router.delete(
  "/soft",
  [checkJwt, checkPermission(["delete_role"])],
  softDeleteRole
);

// Recover role(s)
router.patch(
  "/recover",
  [checkJwt, checkPermission(["update_role"])],
  recoverRole
);

// Update role
router.put(
  "/:uuid",
  [
    checkJwt,
    ...updateRoleValidation,
    ValidateForm,
    // upload.none(),
    checkPermission(["update_role"]),
  ],
  updateRole
);

export default router;
