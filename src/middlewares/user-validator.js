import {body} from "express-validator";
import { emailExists, usernameExists } from "../helpers/db-validator.js"
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const registerValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("The name is required"),
    body("username").notEmpty().withMessage("The user is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("It is not a Valid Email"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("The password must have at least 8 characters. A lowercase letter, an uppercase letter, a number and a symbol"),
    validateFields,
    handleErrors
]


export const loginValidator = [
    body("email").optional().isEmail().withMessage("It is not a Valid Email"),
    body("username").optional().isString().withMessage("The username is in the wrong format"),
    body("password").isLength({min: 8}).withMessage("The password must have at least 8 characters. A lowercase letter, an uppercase letter, a number and a symbol"),
    validateFields,
    handleErrors
]


export const updatePasswordValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("newPassword").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validateFields,
    handleErrors
]

export const updateUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("email").optional().custom(emailExists),
    body("username").optional().custom(usernameExists),
    validateFields,
    handleErrors
]

export const deleteUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validateFields,
    handleErrors
]