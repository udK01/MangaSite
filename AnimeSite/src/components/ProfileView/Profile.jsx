import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import dateFormatter from "../InspectView/DateFormatter";
import UserContext from "../UserContext";
import Separator from "../Separator";
import Card from "./ProfileCards";

import axios from "axios";

import ComicsProvider from "../ComicsProvider";

import { FaEdit } from "react-icons/fa";

export default function Profile() {
  const { user } = useContext(UserContext);
  const { comics } = useContext(ComicsProvider);

  const [profileOwner, setProfileOwner] = useState();
  const [bookmarks, setBookmarks] = useState([]);
  const [comments, setComments] = useState();
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState(null);

  const defaultDesc = `We don't know much about ${profileOwner.username}, but we are sure they are great!`;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get("user");
    axios
      .get(`/api/users/${username}`)
      .then((response) => {
        setProfileOwner(response.data[0]);
        setBookmarks(response.data[0].bookmarks);
        setComments(response.data[0].comments);
      })
      .catch((error) => console.error(`Failed to get user:`, error));
  }, [location.search]);

  function handleImageChange(event) {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const selectedImage = files[0];
      setImage(selectedImage);
    }
  }

  function findManga(id) {
    return comics.find((manga) => manga.mangaID === id);
  }

  const DisplayComment = () => {
    return (
      <section className="w-full h-auto rounded-sm font-poppins text-white md:text-[16px] 2xs:text-[14px]">
        <div className="p-4 bg-quaternary mt-10">
          <div>Comments Posted</div>
          <Separator />
          {comments.length > 0 ? (
            <div>
              {comments
                .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
                .map((comment) => (
                  <React.Fragment key={comment.commentID}>
                    <div className="border-l-2 border-primary">
                      <div className="flex justify-between mx-2 mt-5">
                        <div className="flex">
                          <div className="text-orange-400">
                            {profileOwner.username}
                          </div>
                          <div className="flex flex-shrink-0 mx-[6px]">
                            commented under
                          </div>
                          <Link
                            to={`/inspect?manga=${
                              findManga(comment.mangaID).mangaID
                            }`}
                            className="text-orange-400 hover:text-primary line-clamp-2 hover:cursor-pointer transition-colors duration-200"
                          >
                            {findManga(comment.mangaID).mangaTitle}
                          </Link>
                        </div>

                        <div className="flex flex-shrink-0 md:text-[16px] 2xs:text-[12px]">
                          {dateFormatter.getFormattedDate(comment.uploadDate)}
                        </div>
                      </div>
                      <div className="text-dimWhite ml-2">
                        {comment.content}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
            </div>
          ) : (
            <div className="w-full text-center text-[24px] font-bold my-4 hover:underline hover:text-primary hover:cursor-default">
              This user has yet to comment anything. :c
            </div>
          )}
        </div>
      </section>
    );
  };

  const DisplayBookmarks = () => {
    return (
      <section className="w-full h-auto rounded-sm font-poppins my-10 text-white">
        <div className="p-4 bg-quaternary">
          <div>Top Bookmarks</div>
          <Separator />
          <div className="flex 2xs:flex-wrap lg:flex-nowrap">
            {bookmarks.length > 0 ? (
              bookmarks.slice(0, 5).map((bookmark, index) => (
                <div
                  key={index}
                  className="flex 2xs:w-1/2 md:w-[145px] lg:w-1/5"
                >
                  <Card manga={findManga(bookmark.mangaID)} />
                </div>
              ))
            ) : (
              <div className="w-full text-center text-[24px] font-bold my-4 hover:underline hover:text-primary hover:cursor-default">
                This user has yet to bookmark anything. :c
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  const DisplayUser = () => {
    return (
      <section className="w-full h-auto rounded-sm font-poppins text-white">
        {/* Route */}
        <div className="flex justify-between md:text-[14px] 2xs:text-[16px] w-full bg-quaternary rounded-sm text-white p-2">
          <div className="w-full flex justify-between">
            <div className="flex">
              <Link
                to={"/"}
                className="hover:text-primary mr-2 transition-colors duration-300"
              >
                Home
              </Link>
              <p className="transition-colors duration-300">&gt;</p>
              <Link
                to={`/profile?user=${profileOwner.username}`}
                className="hover:text-primary mx-2 transition-colors duration-300"
              >
                {profileOwner.username}
              </Link>
            </div>
            <div className="flex">
              {editing && (
                <div
                  className="px-2 rounded-md bg-gray-400 hover:cursor-pointer hover:bg-gray-600"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </div>
              )}
              {user.length > 0 && profileOwner.userID === user[0].userID && (
                <div
                  className={`bg-primary px-2 ${
                    editing && "mx-2"
                  } rounded-md hover:cursor-pointer hover:bg-purple-800`}
                  onClick={() => setEditing(true)}
                >
                  Edit
                </div>
              )}
              {editing && (
                <div
                  className="px-2 rounded-md bg-green-700 hover:cursor-pointer hover:bg-green-900"
                  onClick={() => {
                    setEditing(false);
                  }}
                >
                  Save
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="flex w-full h-auto bg-quaternary mt-10 p-4 md:text-[16px] 2xs:text-[20px]">
          {/* Left */}
          <div className="flex flex-col w-[180px] flex-shrink-0">
            {/* Image Selector */}
            <div className="relative border-2 size-36 border-primary flex justify-center items-center bg-secondary">
              <img
                src={profileOwner.profilePicture}
                alt={profileOwner.profilePicture}
                className={`${editing && "brightness-50"} w-full h-full`}
              />
              {editing && (
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary rounded-full p-1"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="fileInput"
                  />
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer text-white hover:text-primary text-3xl"
                  >
                    <FaEdit />
                  </label>
                  {image && (
                    <p className="absolute w-[150px] -translate-x-12 text-white mt-2">
                      Selected Image: <br /> {image.name}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Right */}
          <div className="flex flex-col">
            <div className=" ml-4 text-white text-[32px] w-full transition-colors duration-300 hover:text-orange-400 hover:cursor-default">
              {profileOwner.username}
            </div>
            {editing ? (
              <textarea
                placeholder={profileOwner.description ?? defaultDesc}
                className="2xs:w-full md:w-[527px] min-h-[68px] px-4 rounded-sm border-2 border-quaternary bg-secondary text-white hover:cursor-pointer hover:text-primary"
              ></textarea>
            ) : (
              <div className="line-clamp-4 transition-colors duration-300 hover:text-orange-400 hover:cursor-default">
                {profileOwner.description ?? defaultDesc}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  return (
    <section className="w-full md:max-w-[826px]">
      {profileOwner && (
        <>
          {/* Basic Profile Info */}
          <DisplayUser />
          {/* Bookmarks */}
          <DisplayBookmarks />
          {/* Comments */}
          <DisplayComment />
        </>
      )}
    </section>
  );
}
