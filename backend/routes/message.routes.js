import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute,getMessages); //this has get method (not post)
router.post("/send/:id", protectRoute, sendMessage); //the protect route is middleware. meaning that it will be invoked before the sendMessage controller. protectRoute will protect from unauthorized access/users

export default router;