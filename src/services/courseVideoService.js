const CourseVideo = require("../model/courseVideoModel");

exports.fetchVideosBySkill = async (skillId) => {
  const videos = await CourseVideo.find({
    skill: skillId,
    isActive: true
  }).sort({
    type: 1,
    order: 1
  });
  const primary = videos.find((v) => v.type === "primary") || null;
  const recommended = videos.filter((v) => v.type === "recommended");
  return { primary, recommended };
};

exports.addVideoToSkill = async (skillId, payload) => {
  if (payload.type === "primary") {
    await CourseVideo.updateMany(
      { skill: skillId, type: "primary" },
      { $set: { type: "recommended" } }
    );
  }
  return CourseVideo.create({ ...payload, skill: skillId });
};

exports.updateVideo = async (id, payload) => {
  const video = await CourseVideo.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });
  if (!video) {
    const err = new Error("Video not found");
    err.statusCode = 404;
    throw err;
  }
  return video;
};

exports.deactivateVideo = async (id) => {
  const video = await CourseVideo.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
  if (!video) {
    const err = new Error("Video not found");
    err.statusCode = 404;
    throw err;
  }
  return video;
};
