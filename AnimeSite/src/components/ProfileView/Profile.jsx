import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../PopularToday/PopularTodayCard";
import dateFormatter from "../InspectView/DateFormatter";
import UserContext from "../UserContext";
import Separator from "../Separator";
import axios from "axios";

export default function Profile({ comics }) {
  const { user } = useContext(UserContext);
  const [profileOwner, setProfileOwner] = useState();
  const [bookmarks, setBookmarks] = useState([]);
  const [comments, setComments] = useState();
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState(null);

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

  return (
    profileOwner && (
      <>
        {/* Basic Profile Info */}
        <section className="w-[826px] h-auto rounded-sm font-poppins text-white">
          {/* Route */}
          <div className="flex justify-between text-[14px] w-full bg-quaternary rounded-sm text-white p-2">
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
          </div>
          {/* Body */}
          <div className="flex w-full h-auto bg-quaternary mt-10 p-4">
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
              <div className="line-clamp-4 transition-colors duration-300 hover:text-orange-400 hover:cursor-default">
                {profileOwner.description ??
                  `We don't know much about ${profileOwner.username}, but we are sure they are great!`}
              </div>
            </div>
          </div>
        </section>
        {/* Bookmarks */}
        <section className="w-[826px] h-auto rounded-sm font-poppins text-white">
          <div className="p-4 bg-quaternary mt-10">
            <div>Top Bookmarks</div>
            <Separator />
            <div className="w-full flex flex-wrap">
              {bookmarks.length > 0 ? (
                bookmarks.slice(0, 5).map((bookmark) => (
                  <div className="flex ml-[11px]">
                    <Card
                      key={bookmark.bookmarkID}
                      manga={findManga(bookmark.mangaID)}
                    />
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
        {/* Comments */}
        <section className="w-[826px] h-auto rounded-sm font-poppins text-white">
          <div className="p-4 bg-quaternary mt-10">
            <div>Comments Posted</div>
            <Separator />
            {comments.length > 0 ? (
              <div>
                {comments.map((comment) => (
                  <React.Fragment key={comment.commentID}>
                    <div className="border-l-2 border-primary">
                      <div className="flex justify-between mx-2 mt-5">
                        <div className="flex">
                          <div className="text-orange-400">
                            {profileOwner.username}
                          </div>
                          <div className="mx-[6px]">commented under</div>
                          <Link
                            to={`/${findManga(
                              comment.mangaID
                            ).mangaTitle.replace(/\s+/g, "-")}`}
                            className="text-orange-400 hover:text-primary hover:cursor-pointer transition-colors duration-200"
                          >
                            {findManga(comment.mangaID).mangaTitle}
                          </Link>
                        </div>

                        <div>
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
      </>
    )
  );
}
