import { Router } from "express";
import { checkJwt } from "@middlewares/checkJwt";
import { checkPermission } from "@middlewares/checkPermission";
import { ValidateForm } from "@middlewares/ValidateForm";

// UseCases
import getAllUser from "@admin/user/useCase/getAllUser";
import getOneUserByID from "@admin/user/useCase/getOneUserByID";
import updateUser from "@admin/user/useCase/updateUser";
import createUser from "@admin/user/useCase/createUser";
import DeleteUser from "@admin/user/useCase/deleteUser";
import SoftDeleteUser from "@admin/user/useCase/softDeleteUser";
import RecoverUser from "@admin/user/useCase/recoverUser";

// Validations
import createUserValidation from "@admin/user/validation/createUser";
import updateUserValidation from "@admin/user/validation/updateUser";
import profileImage from "@admin/user/validation/profileImage";

const router = Router();

// Get all users
router.get("/", [checkJwt, checkPermission(["read_user"])], getAllUser);

// Get One Specific User
router.get(
  "/:uuid",
  [checkJwt, checkPermission(["read_user"])],
  getOneUserByID
);

// Create a new user
router.post(
  "/",
  [
    checkJwt,
    profileImage.single("profile_image"),
    ...createUserValidation,
    ValidateForm,
    checkPermission(["create_user"]),
  ],
  createUser
);

// Delete User(s)
router.delete("/", [checkJwt, checkPermission(["delete_user"])], DeleteUser);

// Soft Delete User(s)
router.delete(
  "/soft",
  [checkJwt, checkPermission(["delete_user"])],
  SoftDeleteUser
);

// Recover User(s)
router.patch(
  "/recover",
  [checkJwt, checkPermission(["update_user"])],
  RecoverUser
);

// Update User
router.put(
  "/:uuid",
  [
    checkJwt,
    profileImage.single("profile_image"),
    ...updateUserValidation,
    ValidateForm,
    checkPermission(["update_user"]),
  ],
  updateUser
);

export default router;
