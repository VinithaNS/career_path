const mongoose = require("mongoose");

const homePageSchema = new mongoose.Schema(
  {
    hero: {
      badge: {
        type: String,
        required: true
      },

      titleLine1: {
        type: String,
        required: true
      },

      titleLine2: {
        type: String,
        required: true
      },

      highlightedText: {
        type: String,
        required: true
      },

      description: {
        type: String,
        required: true
      },

      image: {
        type: String,
        default: ""
      },

      primaryButton: {
        text: {
          type: String,
          required: true
        },

        link: {
          type: String,
          required: true
        }
      },

      secondaryButton: {
        text: {
          type: String,
          required: true
        },

        link: {
          type: String,
          required: true
        }
      }
    },

    stats: [
      {
        value: {
          type: String,
          required: true
        },

        label: {
          type: String,
          required: true
        },

        icon: {
          type: String,
          default: ""
        }
      }
    ],

    quickLinks: [
      {
        title: {
          type: String,
          required: true
        },

        subtitle: {
          type: String,
          required: true
        },

        icon: {
          type: String,
          default: ""
        },

        link: {
          type: String,
          required: true
        }
      }
    ]
  },

  {
    timestamps: true
  }
);

module.exports = mongoose.model("HomePage", homePageSchema);
