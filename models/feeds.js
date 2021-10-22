import mongoose from "mongoose";

const FeedSchema = new mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

//if the model already exits use it else create another one
const FeedPost = mongoose.models.Feeds || mongoose.model("Feeds", FeedSchema);

export default FeedPost;
