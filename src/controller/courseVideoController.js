const courseVideoService = require("../services/courseVideoService");

exports.getVideosBySkill = async (req, res) => {
  try {
    const data = await courseVideoService.fetchVideosBySkill(
      req.params.skillId
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addVideo = async (req, res) => {
  try {
    const video = await courseVideoService.addVideoToSkill(
      req.params.skillId,
      req.body
    );
    res.status(201).json({ success: true, data: video });
  } catch (error) {
    res
      .status(error.statusCode || 400)
      .json({ success: false, message: error.message });
  }
};

exports.updateVideo = async (req, res) => {
  try {
    const video = await courseVideoService.updateVideo(req.params.id, req.body);
    res.status(200).json({ success: true, data: video });
  } catch (error) {
    res
      .status(error.statusCode || 400)
      .json({ success: false, message: error.message });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    await courseVideoService.deactivateVideo(req.params.id);
    res.status(200).json({ success: true, message: "Video deactivated" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};
