const { check, body } = require("express-validator");
export default [
  /**
   * Cluttered, need better validation
   */
  check("name")
    .isString()
    .withMessage("Acceptable characters : A-Z, a-z, 1-0")
    .isLength({ min: 1, max: 32 })
    .withMessage("Min : 1, Max :32")
    .notEmpty()
    .withMessage("Cannot be empty."),
];
