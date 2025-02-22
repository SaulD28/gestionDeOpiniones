import { Router } from "express";
import {updatePassword, updateUser} from "./user.controller.js";
import { updatePasswordValidator, updateUserValidator, updateProfilePictureValidator} from "../middlewares/user-validator.js";


const router = Router();

router.patch("/updatePassword", updatePasswordValidator, updatePassword);
router.put("/updateUser", updateUserValidator, updateUser);
  
export default router;