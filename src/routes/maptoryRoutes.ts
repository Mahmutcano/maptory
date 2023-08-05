import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Maptory CRUD

// Create Maptory
router.post("/", async (req, res) => {
  const { content, image, video } = req.body;
  // @ts-ignore
  const user = req.user;

  try {
    const result = await prisma.maptory.create({
      data: {
        content,
        image,
        video,
        userId: user.id,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Username and email should be unique" });
  }
});

// List Maptory
router.get("/", async (req, res) => {
  const allMaptory = await prisma.maptory.findMany({
    include: {
      user: { select: { id: true, name: true, username: true, image: true } },
    },
    // select: {
    //   id: true,
    //   content: true,
    //   user: {
    //     select: {
    //       id: true,
    //       name: true,
    //       username: true,
    //       image: true,
    //     },
    //   },
    // },
  });
  res.json(allMaptory);
});

// Get One Maptory
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const maptory = await prisma.maptory.findUnique({
    where: { id: Number(id) },
    include: {
      user: true,
    },
  });
  if (!maptory) {
    return res.status(404).json({ error: "Maptory Not Found" });
  }
  res.json(maptory);
});

// Update Maptory
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `Not Implement ${id}` });
});

// Delete Maptory
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.maptory.delete({ where: { id: Number(id) } });
  res.sendStatus(200);
});

export default router;
