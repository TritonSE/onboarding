import { body } from "express-validator";

// establishes a set of rules that the body of the post route must follow
export const createTask = [
  body("title")
    // title must exist, if not this message will be displayed
    .exists()
    .withMessage("A title is required.")
    // bail prevents the remainder of the validation chain for this field from being executed if
    // there was an error
    .bail()
    .notEmpty()
    .withMessage("title cannot be empty.")
    .bail()
    .isString()
    .withMessage("title must be a string.")
    // escape replaces potentially-dangerous characters with HTML entities
    .escape(),
  body("description")
    // order matters for the validation chain, by marking this field as optional, the subsequent
    // parts of the chain will only be evaluated if it exists
    .optional()
    .escape()
    .isString()
    .withMessage("description must be a string."),
  body("isChecked").optional().isBoolean().withMessage("isChecked must be a boolean."),
];
