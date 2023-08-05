import express from "express";
import userRoutes from "./routes/userRoutes";
import maptoryRoutes from "./routes/maptoryRoutes";
import authRoutes from "./routes/authRoutes";
import { authenticateToke } from "./middlewares/authMiddleware";

const app = express();
app.use(express.json());
app.use("/user", authenticateToke, userRoutes);
app.use("/maptory", authenticateToke, maptoryRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World, Update");
});

app.listen(3000, () => {
  console.log("Server Rendering Local:3000");
});
