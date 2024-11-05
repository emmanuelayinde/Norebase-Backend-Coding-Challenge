import express from "express";
import likeRoutes from "@routes/likeRoutes";
import config from "@config/index";
import connectDB from "@config/db";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", likeRoutes);

app.listen(config.PORT, () => {
  connectDB().then(() => console.log(`Server running on port ${config.PORT}`));
});
