import express from "express";
import { deleteUser, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

//api/user user route e ache ar eikhane /test
//so output ta /api/user/test e ashbe

router.delete("/:id",verifyToken,deleteUser);
router.get("/:id", getUser);

export default router;
