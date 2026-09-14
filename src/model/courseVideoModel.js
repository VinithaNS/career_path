const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseVideoSchema = new Schema(
  {
    skill: {
      type: Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
      index: true
    },
    title: { type: String, required: true, trim: true },
    channelName: { type: String, trim: true },
    youtubeVideoId: { type: String, required: true, trim: true },
    thumbnailUrl: { type: String, trim: true },
    durationSeconds: { type: Number, required: true },
    type: {
      type: String,
      enum: ["primary", "recommended"],
      default: "recommended"
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

courseVideoSchema.index({ skill: 1, type: 1, order: 1 });

module.exports = mongoose.model("CourseVideo", courseVideoSchema);
