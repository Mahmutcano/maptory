"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// Maptory CRUD
// Create Maptory
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, image, video } = req.body;
    // @ts-ignore
    const user = req.user;
    try {
        const result = yield prisma.maptory.create({
            data: {
                content,
                image,
                video,
                userId: user.id,
            },
        });
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: "Username and email should be unique" });
    }
}));
// List Maptory
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allMaptory = yield prisma.maptory.findMany({
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
}));
// Get One Maptory
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const maptory = yield prisma.maptory.findUnique({
        where: { id: Number(id) },
        include: {
            user: true,
        },
    });
    if (!maptory) {
        return res.status(404).json({ error: "Maptory Not Found" });
    }
    res.json(maptory);
}));
// Update Maptory
router.put("/:id", (req, res) => {
    const { id } = req.params;
    res.status(501).json({ error: `Not Implement ${id}` });
});
// Delete Maptory
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.maptory.delete({ where: { id: Number(id) } });
    res.sendStatus(200);
}));
exports.default = router;
