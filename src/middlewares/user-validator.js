import { body, param } from "express-validator";
import { emailExists, userExists, usernameExists } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"
/**
 * Validador para el registro de un nuevo usuario
 */
export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("username").notEmpty().withMessage("El username es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
    deleteFileOnError,
    handleErrors
]
/**
 * Validador para el login de un usuario
 */
export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("Username es en formato erróneo"),
    body("password").isLength({ min: 4 }).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
];

/**
 * Validador para la actualización de la contraseña
 */
export const updatePasswordValidator = [
    body("usuario").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("usuario").custom(userExists),
    body("newPassword").isLength({ min: 8 }).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
];

/**
 * Validador para la actualización de la información del usuario
 */
export const updateUserValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    body("name").optional().isString().withMessage("El nombre debe ser un texto"),
    body("email").optional().isEmail().withMessage("Debe ser un email válido"),
    validarCampos,
    handleErrors
]

/**
 * Validador para la actualización de la foto de perfil del usuario
 */
export const updateProfilePictureValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
];
