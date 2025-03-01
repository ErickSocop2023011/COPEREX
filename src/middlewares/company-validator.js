import {body, param} from "express-validator"
import { validateFields } from './validate-fields.js';
import { handleErrors } from './handle-errors.js';
import { validateJWT } from './validate-jwt.js';
import { hasRoles } from './validate-roles.js';
import { categoryExists, CompanyExists, telephoneExists, usernameExists } from "../helpers/db-validator.js";

export const createCompanyValidator =[
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Name is required"),
    body("name").custom(CompanyExists),
    body("category").notEmpty().withMessage("Category is required"),
    body("category").isMongoId().withMessage("It is not a valid Category MongoID"),
    body("category").custom(categoryExists),
    body("representative").notEmpty().withMessage("Representative is required"),
    body("representative").isMongoId().withMessage("It is not a valid User MongoID"),
    body("representative").custom(usernameExists),
    body("telephone").isMobilePhone().withMessage("It is not a valid phone format"),
    body("telephone").custom(telephoneExists),
    validateFields,
    handleErrors
]

export const updateCompanyValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Name is required"),
    body("name").custom(CompanyExists),
    body("category").notEmpty().withMessage("Category is required"),
    body("category").isMongoId().withMessage("It is not a valid Category MongoID"),
    body("category").custom(categoryExists),
    body("representative").notEmpty().withMessage("Representative is required"),
    body("representative").isMongoId().withMessage("It is not a valid User MongoID"),
    body("representative").custom(usernameExists),
    body("telephone").isMobilePhone().withMessage("It is not a valid phone format"),
    body("telephone").custom(telephoneExists),
    validateFields,
    handleErrors
]