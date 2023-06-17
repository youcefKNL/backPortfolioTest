const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  icon: {
    type: [String],
  },
  picture: {
    type: [String],
  },
  mission: {
    type: [String],
  },
  skill: {
    type: [String],
  },
  siteUrl: {
    type: [String],
  },
  github: {
    type: [String],
  },
  moreInfo: {
    type: [String],
  },
});

module.exports = mongoose.model("Project", postSchema);
