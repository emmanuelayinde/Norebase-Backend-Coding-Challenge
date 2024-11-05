import express from "express";
import { LikeController } from "@controllers/likeController";
import rateLimiter from "@middlewares/rateLimiter";

const router = express.Router();
const likeController = new LikeController();

router.get("/articles/:articleId/likes", rateLimiter, likeController.getLikes);
router.post("/articles/:articleId/likes", rateLimiter, likeController.addLike);

export default router;
