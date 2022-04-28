const mongoose = require("mongoose");

const Post = mongoose.model("Post", {
  author: String,
  content: String,
});

module.exports = {
  Post,
};
