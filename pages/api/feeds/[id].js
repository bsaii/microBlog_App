import FeedPost from "../../../models/feeds";
import dbConnect from "../../../utils/dbConnet";

//init database
dbConnect();

//routing based on query/id
const handler = async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const oneFeed = await FeedPost.findById(id);

        if (!oneFeed) return res.status(404).json({ success: false });

        res.status(200).json(oneFeed);
      } catch (error) {
        res.status(404).json({ msg: error.message });
      }
      break;
    case "PATCH":
      try {
        const updateFeed = await FeedPost.findByIdAndUpdate(id, req.body, {
          new: true,
        });

        if (!updateFeed) return res.status(404).json({ success: false });

        res.status(200).json(updateFeed);
      } catch (error) {
        res.status(404).json({ msg: error.message });
      }
      break;
    case "DELETE":
      try {
        const deleteFeed = await FeedPost.findByIdAndDelete(id);

        if (!deleteFeed) return res.status(404).json({ success: false });
        res.status(200).json({ success: true, msg: "Feed Deleted" });
      } catch (error) {
        res.status(404).json({ msg: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
