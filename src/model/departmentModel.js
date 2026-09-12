const mongoose = require("mongoose");
const { Schema } = mongoose;

const departmentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    shortCode: { type: String, trim: true },
    tags: { type: [String], default: [] },
    icon: { type: String, default: "default" },
    description: { type: String, trim: true },
    careerRoadmaps: [{ type: Schema.Types.ObjectId, ref: "CareerRoadmap" }],
    collegeCourses: [{ type: Schema.Types.ObjectId, ref: "CollegeCourse" }],
    degreeCourses: [{ type: Schema.Types.ObjectId, ref: "DegreeCourse" }],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

departmentSchema.index({ order: 1 });

module.exports = mongoose.model("Department", departmentSchema);
