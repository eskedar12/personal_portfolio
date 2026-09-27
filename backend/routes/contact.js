import { Router } from "express";
import rateLimit from "express-rate-limit";
import { createMessage, listMessages } from "../controllers/contactController.js";

const router = Router();

// Limit contact-form submissions per IP to cut down on spam/abuse.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many messages sent. Please try again later." },
});

router.post("/", contactLimiter, createMessage);
router.get("/", listMessages);

export default router;
