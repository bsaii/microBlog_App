import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useGlobalContext } from "../lib/context";
import { useSession } from "next-auth/client";

export const Feed = ({ feed, setCurrentId, editingOnClick }) => {
  const { _id, creator, title, message, tags, selectedFile, likeCount } = feed;

  const { deletePostedFeed, likePostedFeed } = useGlobalContext();

  const handleEdit = () => {
    setCurrentId(_id);
    editingOnClick();
  };

  const [session] = useSession();

  return (
    <div className="w-full border border-gray-400 border-opacity-50 my-4 p-3 rounded">
      {/* title */}
      <div>
        <h3 className="font-semibold text-xl tracking-wide md:text-3xl">
          {title}
        </h3>
      </div>
      {/* creator */}
      <div className="mb-3">
        <p className="text-xs font-thin md:text-base md:my-2">{creator}</p>
      </div>
      {/* image */}
      <div className="w-full h-1/5 my-3">
        <Image
          src={
            selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          alt={title}
          width="1000%"
          height="500%"
          className="object-center object-cover rounded-lg w-full h-full md:max-w-screen-md md:w-full"
        />
      </div>

      {/* message */}
      <div>
        <p className="text-base font-extralight mb-8">{message}</p>
      </div>
      {/* tags */}
      <div className="mb-3">
        <p className="font-light text-sm">{tags.map((tag) => `${tag} `)}</p>
      </div>

      {/* icons */}
      <div className="flex justify-around items-center w-full h-14 bg-jet rounded-md">
        <button
          onClick={() => {
            session ? handleEdit() : null;
          }}
        >
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
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            session ? likePostedFeed(_id, { likeCount: likeCount + 1 }) : null;
          }}
          className="flex items-center justify-center"
        >
          {likeCount}{" "}
          <span>
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
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
          </span>
        </button>
        <button
          onClick={() => {
            session ? deletePostedFeed(_id) : null;
          }}
        >
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
