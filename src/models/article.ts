import mongoose, { Document, Schema } from "mongoose";

interface IArticle extends Document {
  articleId: string;
  likes: number;
  likedBy: string[];
  lastUpdated: Date;
}

const ArticleSchema = new Schema({
  articleId: { type: String, required: true, unique: true },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: String }],
  lastUpdated: { type: Date, default: Date.now },
});

ArticleSchema.index({ articleId: 1 });

export const articleModel = mongoose.model<IArticle>(
  "articleModel",
  ArticleSchema
);
