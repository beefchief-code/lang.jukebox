const express = require("express");
const router = express.Router();
module.exports = router;
const prisma = require("../prisma");

//all users
router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

//one user
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: +id },
      include: { playlists: true },
    });
    res.json(user);
  } catch (e) {
    next(e);
  }
});

//post playlist
router.post("/:id/playlists", async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const playlist = await prisma.playlist.create({
      data: { name, description, ownerId: +id },
    });
    res.status(201).json(playlist);
  } catch (e) {
    next(e);
  }
});
