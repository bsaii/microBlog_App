import FeedPost from "../../../models/feeds";
import dbConnect from "../../../utils/dbConnet";

//init database
dbConnect();

//routing
const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const feeds = await FeedPost.find({}).sort({ createdAt: -1 });
        res.status(200).json(feeds);
      } catch (error) {
        res.status(404).json({ mgs: error.message });
      }
      break;
    case "POST":
      try {
        const feed = await FeedPost.create(req.body);
        res.status(201).json(feed);
      } catch (error) {
        res.status(404).json({ mgs: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
