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
// USER CRUD
// Create User
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, username, lat, long } = req.body;
    try {
        const result = yield prisma.user.create({
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
    }
    catch (error) {
        res.status(400).json({ error: "Username and email should be unique" });
    }
}));
// List Users
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = yield prisma.user.findMany({
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
}));
// Get One User
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield prisma.user.findUnique({
        where: { id: Number(id) },
        include: { maptorys: true },
    });
    res.json(user);
}));
// Update User
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { bio, name, image, lat, long } = req.body;
    try {
        const result = yield prisma.user.update({
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
    }
    catch (error) {
        res.status(400).json({ error: `Failed to update the user` });
    }
}));
// Delete User
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.user.delete({ where: { id: Number(id) } });
    res.sendStatus(200);
}));
exports.default = router;
