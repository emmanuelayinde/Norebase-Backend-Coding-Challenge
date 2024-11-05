import { articleModel } from "@models/article";
import { Cache } from "@utils/cache";

export class LikeService {
  private cache: Cache;

  constructor() {
    this.cache = new Cache();
  }

  public async getLikes(articleId: string): Promise<number> {
    // Try to get from cache first
    const cachedLikes = await this.cache.get(`likes:${articleId}`);
    if (cachedLikes !== null) {
      return parseInt(cachedLikes);
    }

    // If not in cache, get from DB and cache it
    const article = await articleModel.findOne({ articleId });
    const likes = article?.likes || 0;

    await this.cache.set(`likes:${articleId}`, likes.toString(), 300); // Cache for 5 minutes
    return likes;
  }

  public async addLike(
    articleId: string,
    userId: string
  ): Promise<{ likes: number; alreadyLiked: boolean }> {
    const article = await articleModel.findOne({ articleId });

    if (!article) {
      // Create new article if it doesn't exist
      const newArticle = await articleModel.create({
        articleId,
        likes: 1,
        likedBy: [userId],
        lastUpdated: new Date(),
      });
      // Update cache
      await this.cache.set(`likes:${articleId}`, "1");
      return { likes: 1, alreadyLiked: false };
    }

    // Check if user already liked
    if (article.likedBy.includes(userId)) {
      return { likes: article.likes, alreadyLiked: true };
    }

    // Atomic update operation
    const updated = await articleModel.findOneAndUpdate(
      { articleId, likedBy: { $ne: userId } },
      {
        $inc: { likes: 1 },
        $push: { likedBy: userId },
        $set: { lastUpdated: new Date() },
      },
      { new: true }
    );

    if (updated) {
      await this.cache.set(`likes:${articleId}`, updated.likes.toString());
      return { likes: updated.likes, alreadyLiked: false };
    }

    return { likes: article.likes, alreadyLiked: true };
  }
}
