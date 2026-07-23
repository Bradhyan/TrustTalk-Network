import express from "express";
import { enviarCorreo } from "../controllers/correoController.js";

const router = express.Router();

router.post("/enviar_correo", enviarCorreo);

export default router;
