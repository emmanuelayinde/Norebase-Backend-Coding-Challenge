import { Request, Response } from "express";
import { LikeService } from "@services/likeService";

export class LikeController {
  private likeService: LikeService;

  constructor() {
    this.likeService = new LikeService();
  }

  public getLikes = async (req: Request, res: Response): Promise<void> => {
    try {
      const { articleId } = req.params;
      const likes = await this.likeService.getLikes(articleId);
      res.json({ likes });
    } catch (error) {
      res.status(500).json({ error: "Failed to get likes count" });
    }
  };

  public addLike = async (req: Request, res: Response): Promise<void> => {
    try {
      const { articleId } = req.params;
      const userId = req.headers["user-id"] as string; // In real app, get from auth middleware

      if (!userId) {
        res.status(401).json({ error: "Authentication required" });
        return;
      }

      const result = await this.likeService.addLike(articleId, userId);

      if (result.alreadyLiked) {
        res.status(400).json({ error: "User has already liked this article" });
        return;
      }

      res.json({ likes: result.likes });
    } catch (error) {
      res.status(500).json({ error: "Failed to add like" });
    }
  };
}
