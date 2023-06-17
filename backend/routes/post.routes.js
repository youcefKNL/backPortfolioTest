const express = require("express");
const { setProject, getProjects } = require("../controllers/post.controller");
const router = express.Router();

router.get("/", getProjects);
router.post("/", setProject);
//router.delete("/:id", deletePost);

module.exports = router;
