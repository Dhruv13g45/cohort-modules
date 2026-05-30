import { Router } from "express";
import { getMeController, loginController, logoutController, registerController } from "../controllers/auth.controllers.js";
import { upload } from "../middlewares/upload.middleware.js";


const router = Router()

router.post("/login", loginController)
router.post("/register", upload.single("photo"),  registerController)
router.post("/logout", logoutController)
router.get("/get-me", getMeController)



export default router