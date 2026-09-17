const mongoose = require("mongoose");

const tenthStreamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    subjects: [
      {
        type: String,
        trim: true
      }
    ],
    // e.g. "Physics, Chemistry, Biology, Maths"
    tagline: {
      type: String,
      trim: true
    },
    icon: {
      type: String, // icon key/name used by the frontend icon map
      default: "book"
    },
    color: {
      type: String, // hex or theme token, e.g. "#7C3AED"
      default: "#7C3AED"
    },
    // What this stream leads to — used to link into existing Department module
    relatedDepartments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
      }
    ],
    // Skills worth building while in this stream — links to existing Skill module
    relatedSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill"
      }
    ],
    higherStudyOptions: [
      {
        type: String,
        trim: true
      }
    ],
    order: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

tenthStreamSchema.index({ isActive: 1, order: 1 });

module.exports = mongoose.model("TenthStream", tenthStreamSchema);
