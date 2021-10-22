import React, { useEffect, useRef, useState, forwardRef } from "react";
import { useGlobalContext } from "../lib/context";
import { useSession } from "next-auth/client";
import FileBase from "react-file-base64";

//what still needs to be done
// 1* The styling
// 2* uploading and sending image to the db
// 3* do more if you can
const Form = forwardRef(({ currentId, setCurrentId }, ref) => {
  const [feedData, setFeedData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const [session] = useSession();
  // console.log(session);

  const { feeds, createFeedPost, updateFeedPost } = useGlobalContext();

  //if there is no currentId, create a feed else update/edit it
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === null) {
      createFeedPost(feedData);
      clear();
    } else {
      updateFeedPost(currentId, feedData);
      clear();
    }
  };

  const clear = () => {
    setCurrentId(null);
    setFeedData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  //when there is an id, the form should have the data from the id so it can be edited
  useEffect(() => {
    const toBeEditedFeed = () => {
      return currentId ? feeds.find((feed) => feed._id === currentId) : "";
    };
    if (toBeEditedFeed) {
      setFeedData(toBeEditedFeed);
    }
  }, [feeds, currentId]);

  //when not signed in
  if (!session) {
    return (
      <div className="w-full h-8 bg-jet rounded-sm my-4 p-5 text-lg flex justify-center items-center">
        <p>Sign in to create, edit, like and delete a post...</p>
      </div>
    );
  }

  //when user is signed in
  return (
    <form
      className="bg-jet rounded-sm my-4 p-5"
      onSubmit={handleSubmit}
      ref={ref}
    >
      <div className="my-1">
        <h2 className="text-lg mb-2 font-medium md:text-xl">
          {currentId ? `Editing ${feedData.title}` : "Create A Feed"}
        </h2>
      </div>
      <div>
        <div
          className="my-2 bg-eerieBlack
         p-3 rounded"
        >
          <input
            type="text"
            name="creator"
            className="w-full rounded border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none p-2 text-base h-8 bg-jet"
            placeholder="Creator"
            required
            value={feedData.creator || ""}
            onChange={(e) =>
              setFeedData({ ...feedData, creator: e.target.value })
            }
          />
        </div>
        <div
          className="my-2 bg-eerieBlack
         p-3 rounded"
        >
          <input
            type="text"
            name="title"
            className="w-full rounded border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none p-2 text-base h-8 bg-jet"
            placeholder="Title"
            required
            value={feedData.title || ""}
            onChange={(e) =>
              setFeedData({ ...feedData, title: e.target.value })
            }
          />
        </div>
        <div
          className="my-2 bg-eerieBlack
         p-3 rounded"
        >
          <textarea
            name="message"
            value={feedData.message || ""}
            className="w-full rounded border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none p-2 text-base h-20 bg-jet"
            placeholder="Tell what is happening"
            required
            onChange={(e) =>
              setFeedData({ ...feedData, message: e.target.value })
            }
          />
        </div>
        <div
          className="my-2 bg-eerieBlack
         p-3 rounded"
        >
          <input
            type="text"
            name="tags"
            className="w-full rounded border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none p-2 text-base h-8 bg-jet"
            placeholder="#Tags...eg.#awesome #fyp"
            required
            value={feedData.tags || ""}
            onChange={(e) => setFeedData({ ...feedData, tags: e.target.value })}
          />
        </div>
        <div className="mb-4 mt-3 flex flex-col md:mb-6">
          {/* <label className="w-1/4 flex justify-center items-center p-4 bg-black rounded cursor-pointer text-gray-300 h-6 z-50">
            {/* icon */}
          {/* <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-sm">image</span>
            
          </label> */}
          <label className="text-base md:text-lg">Upload an image</label>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setFeedData({ ...feedData, selectedFile: base64 })
            }
          />
        </div>
        {/* button */}
        <div className="w-full h-10">
          <button
            type="submit"
            className="bg-green-500 w-full h-full focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 rounded-md text-lg md:text-xl"
            onClick={handleSubmit}
          >
            {currentId ? "Edit Post" : "Post"}
          </button>
        </div>
      </div>
    </form>
  );
});

export default Form;
