const express = require("express");
const router = express.Router();

const {
  getVideosBySkill,
  addVideo,
  updateVideo,
  deleteVideo
} = require("../controller/courseVideoController");

router.get("/skills/:skillId/videos", getVideosBySkill);
router.post("/skills/:skillId/videos", addVideo);
router.put("/videos/:id", updateVideo);
router.delete("/videos/:id", deleteVideo);

module.exports = router;
