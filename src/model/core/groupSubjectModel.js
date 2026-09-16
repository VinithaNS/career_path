const mongoose = require("mongoose");

const groupSubjectSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EleventhGroup",
      required: true
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },

    isCore: {
      type: Boolean,
      default: false
    },

    isOptional: {
      type: Boolean,
      default: false
    },

    displayOrder: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

groupSubjectSchema.index(
  {
    group: 1,
    subject: 1
  },
  {
    unique: true
  }
);

module.exports = mongoose.model("GroupSubject", groupSubjectSchema);
