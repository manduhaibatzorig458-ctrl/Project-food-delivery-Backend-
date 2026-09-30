import { Router } from "express";
import { updateMe } from "../controllers/auth/update-me.js";
import { requireToken } from "../middleware/require-token.js";

export const usersRouter = Router();

usersRouter.patch("/me", requireToken, updateMe);
