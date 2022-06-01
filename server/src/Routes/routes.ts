import express, { Router } from "express";
import { authMiddleware } from "../Middleware/auth-middleware";
import controller from "../Repositories/controller";

const router: Router = express.Router();

router.post("/", authMiddleware, controller.postNotes);
router.get("/", authMiddleware, controller.getNotes);
router.delete("/:id", authMiddleware, controller.deleteNotes);
router.get("/stats", authMiddleware, controller.getStats);
router.patch("/:id", authMiddleware, controller.patchNotes);
router.get("/:id", authMiddleware, controller.getNote);

export default router;
