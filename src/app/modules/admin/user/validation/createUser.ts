const { check, body } = require("express-validator");
export default [
  /**
   * Cluttered, need better validation
   */
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Cannot be empty"),
  check("fullname")
    .isString()
    .withMessage("Acceptable characters : A-Z, a-z, 1-0")
    .isLength({ min: 1, max: 32 })
    .withMessage("Min : 1, Max :32")
    .notEmpty()
    .withMessage("Cannot be empty."),
  check("password")
    .isString()
    .withMessage("Acceptable characters : A-Z, a-z, 1-0")
    .isLength({ min: 8, max: 32 })
    .withMessage("Min : 8, Max :32")
    .notEmpty()
    .withMessage("Cannot be empty.")
    .custom((value, { req, loc, path }) => {
      if (value !== req.body.password_confirm) {
        throw new Error("Passwords don't match");
      } else {
        return value;
      }
    }),
];
