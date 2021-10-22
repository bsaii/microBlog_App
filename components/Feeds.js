import React, { useState } from "react";
import { Feed } from "./Feed";
import { useGlobalContext } from "../lib/context";

// 1* set up a loading

const Feeds = ({ setCurrentId, editingOnClick }) => {
  const { feeds } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="p-2 w-full">
      {feeds.map((feed, index) => (
        <div key={index}>
          <Feed
            feed={feed}
            key={feed._id}
            setCurrentId={setCurrentId}
            editingOnClick={editingOnClick}
          />
        </div>
      ))}
    </div>
  );
};

export default Feeds;
