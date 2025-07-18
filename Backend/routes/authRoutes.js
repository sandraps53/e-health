import express from "express"
import { loginDoctor, registerDoctor } from "../controllers/doctorController.js";

const router = express.Router();

router.post('/register', registerDoctor);
router.post('/login',loginDoctor);

export default router;