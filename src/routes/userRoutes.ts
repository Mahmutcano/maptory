import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// USER CRUD

// Create User
router.post("/", async (req, res) => {
  const { email, name, username, lat, long } = req.body;
  try {
    const result = await prisma.user.create({
      data: {
        email,
        name,
        username,
        lat,
        long,
        bio: "Hello, I'm new on Maptory",
      },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Username and email should be unique" });
  }
});

// List Users
router.get("/", async (req, res) => {
  const allUser = await prisma.user.findMany({
    // select: {
    //   id: true,
    //   name: true,
    //   image: true,
    //   lat: true,
    //   long: true,
    //   bio: true
    // },
  });
  res.json(allUser);
});

// Get One User
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: { maptorys: true },
  });
  res.json(user);
});

// Update User
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { bio, name, image, lat, long } = req.body;
  try {
    const result = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        bio,
        name,
        image,
        lat,
        long,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: `Failed to update the user` });
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id: Number(id) } });
  res.sendStatus(200);
});

export default router;
