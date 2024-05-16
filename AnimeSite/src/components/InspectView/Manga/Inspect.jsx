// Mandatory Imports
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

// Auxiliary Classes
import InteractiveStarRating from "./InteractiveStarRating";
import ComicsProvider from "../../ComicsProvider";
import UserContext from "../../UserContext";
import MangaChapters from "./MangaChapters";
import StarRating from "../../StarRating";
import TagDropDown from "./TagDropDown";
import DropDown from "../../DropDown";
import BodyInfo from "./BodyInfo";
import SideInfo from "./SideInfo";
import Comments from "../Comments";

// Icon
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

export default function Inspect() {
  const { user, setUser } = useContext(UserContext);
  const { comics, setComics } = useContext(ComicsProvider);
  const [manga, setManga] = useState(null);

  const [editing, setEditing] = useState(false);
  const [hover, setHover] = useState(false);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("OnGoing");
  const [type, setType] = useState("Manhwa");
  const [genres, setGenres] = useState([]);
  const [removeGenres, setRemoveGenres] = useState([]);
  const [addGenres, setAddGenres] = useState([]);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const mID = parseInt(searchParams.get("manga"), 10);
    const foundManga = comics.find((comic) => comic.mangaID === mID);

    // Set Manga Object.
    setManga(foundManga);

    // Handle Bookmark.
    setBookmarked(false);
    setBookmarkCount(foundManga.bookmarkCount);
    user.length > 0 &&
      user[0].bookmarks.map((bookmark) => {
        if (bookmark.mangaID === foundManga.mangaID) {
          setBookmarked(true);
        }
      });

    initialiseItems(foundManga);
  }, [location.search]);

  // Need to keep this due to useState's in this class.
  // Otherwise I will have to add a lot of parameters...
  const SideInfoInput = ({ label1, label2 }) => (
    <div className="flex flex-col">
      <div className="flex justify-between items-center w-full bg-secondary rounded-md text-dimWhite mt-2">
        <div className="pl-2 text-white">{label1}</div>
        <DropDown
          options={["OnGoing", "Completed", "Hiatus", "Dropped", "Coming Soon"]}
          value={status}
          func={setStatus}
          className="w-[118px] justify-evenly pb-2 pr-2 rounded-md"
          inspectWidth={"w-[150px] px-2 -translate-x-6"}
        />
      </div>
      <div className="flex justify-between items-center w-full bg-secondary rounded-md text-dimWhite mt-2">
        <div className="pl-2 text-white">{label2}</div>
        <DropDown
          options={["Manhwa", "Manga", "Manhua"]}
          value={type}
          func={setType}
          className="w-[118px] justify-evenly pb-2 pr-2 rounded-md"
          inspectWidth={"w-[150px] px-4 -translate-x-6"}
        />
      </div>
    </div>
  );

  // Formatting Function #1
  function getFormattedDate(date) {
    const savedDate = new Date(date);

    const options = { month: "long", day: "2-digit", year: "numeric" };
    return savedDate.toLocaleDateString("en-US", options);
  }

  // Formatting Function #2
  function reverseChapters(chapters) {
    return chapters.sort((a, b) => b.chapterNumber - a.chapterNumber);
  }

  // Formatting Function #3
  function sortGenres(genres) {
    return genres.sort((a, b) => a.localeCompare(b));
  }

  // Drag & Drop Image Funtions--------------------
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
  //-----------------------------------------------

  // Cancel edit, reset values.
  function initialiseItems(foundManga = manga) {
    setEditing(false);
    setTitle(foundManga.mangaTitle);
    setDescription(foundManga.description);
    setStatus(foundManga.status);
    setType(foundManga.type);
    setImage(null);
    setGenres(sortGenres(foundManga.genres));
    setRemoveGenres([]);
    setAddGenres([]);
  }

  function handleSubmit() {
    const mImage =
      (image && `../../thumbnails/${image.name}`) || manga.mangaImage;
    const mReleased =
      document.getElementById("Released").value || manga.released;
    const mAuthor = document.getElementById("Author").value || manga.author;
    const mArtist = document.getElementById("Artist").value || manga.artist;
    const mSerialisation =
      document.getElementById("Serialisation").value || manga.serialisation;
    const mPostedBy =
      document.getElementById("Posted By").value || manga.postedBy;

    if (mImage !== manga.mangaImage) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("previousFileName", manga.mangaImage);
      axios
        .post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch((error) => console.error(`Failed to replace file:`, error));
    }

    axios
      .put(
        `/api/${manga.mangaID}`,
        {
          mangaTitle: title,
          mangaImage: mImage,
          description: description,
          released: mReleased,
          author: mAuthor,
          artist: mArtist,
          rating: manga.rating,
          serialisation: mSerialisation,
          postedBy: mPostedBy,
          status: status,
          type: type,
          addGenres: addGenres,
          removeGenres: removeGenres,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setManga(response.data);
        setGenres(response.data.genres);
        setStatus(response.data.status);
        setType(response.data.type);
        const index = comics.findIndex(
          (manga) => manga.mangaID === response.data.mangaID
        );
        comics[index] = response.data;
        setEditing(false);
      })
      .catch((error) => {
        console.error(`Failed to update comic:`, error);
      });

    initialiseItems();
  }

  function toggleBookmarked() {
    setBookmarked(!bookmarked);
  }

  // Handle bookmark UI until user reloads.
  const alterBookmarks = (action) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser[0] };
      if (action === "add") {
        updatedUser.bookmarks = [...updatedUser.bookmarks, manga];
        comics.find((c) => c.mangaID === manga.mangaID).bookmarkCount += 1;
      } else if (action === "remove") {
        updatedUser.bookmarks = updatedUser.bookmarks.filter(
          (bookmark) => bookmark.mangaID !== manga.mangaID
        );
        comics.find((c) => c.mangaID === manga.mangaID).bookmarkCount -= 1;
      }
      return [updatedUser];
    });
  };

  function handleBookmark(action) {
    user.length > 0
      ? axios
          .post(
            "/api/bookmark",
            { userID: user[0].userID, mangaID: manga.mangaID, action: action },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
            toggleBookmarked();
            switch (action) {
              case "add":
                setBookmarkCount(bookmarkCount + 1);
                alterBookmarks("add");
                break;
              case "remove":
                setBookmarkCount(bookmarkCount - 1);
                alterBookmarks("remove");
                break;
            }
          })
          .catch((error) => console.error(`Failed to alter bookmarks:`, error))
      : console.log(`Add login request feature.`);
  }

  // Handles deletion of comic.
  function handleDelete() {
    axios
      .post(
        "/api/deleteManga",
        {
          mangaID: manga.mangaID,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setComics(comics.filter((c) => c.mangaID !== manga.mangaID));
        navigate("/");
      })
      .catch((error) => console.error(`Failed to delete manga:`, error));
  }

  return (
    <section className="w-[826px] h-auto font-poppins">
      {manga && (
        // Helps ensure the space is allocated already.
        <>
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
                to={`/${manga.mangaTitle.replace(/\s+/g, "-")}`}
                className="hover:text-primary mx-2 transition-colors duration-300"
              >
                {manga.mangaTitle}
              </Link>
            </div>
            <div className="flex">
              {user.length > 0 && user[0].accessLevel > 1 && (
                <div>
                  {editing && (
                    <button
                      className="mr-2 bg-gray-500 px-4 rounded-md"
                      onClick={() => initialiseItems()}
                    >
                      Cancel
                    </button>
                  )}
                  {!editing && (
                    <button
                      className="bg-red-600 hover:bg-red-700 px-4 rounded-md mr-2"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  )}
                  <button
                    className="bg-primary hover:bg-purple-700 px-4 rounded-md"
                    onClick={() => setEditing(true)}
                  >
                    Edit
                  </button>
                </div>
              )}
              {editing && (
                <button
                  className="bg-green-700 hover:bg-green-800 px-4 rounded-md ml-2"
                  onClick={() => handleSubmit()}
                >
                  Save
                </button>
              )}
            </div>
          </div>
          {/* Body */}
          <div className="flex w-full h-auto bg-quaternary mt-10 p-4">
            {/* Left Side */}
            <div id="left" className="flex flex-col w-[180px] flex-shrink-0">
              {/* Image Selector */}
              <div className="relative inline-block">
                <img
                  src={manga.mangaImage}
                  alt={manga.mangaTitle}
                  className={`${editing && "brightness-50"}`}
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
              {/* Bookmark Button */}
              <button
                className={`w-full flex items-center justify-center text-white p-2 rounded-md mt-2 text-[14px] transition-all duration-300 ${
                  bookmarked
                    ? "bg-red-700 hover:bg-red-800"
                    : "bg-primary hover:bg-purple-800"
                } `}
                onClick={() => handleBookmark(bookmarked ? "remove" : "add")}
              >
                {bookmarked ? <FaBookmark /> : <FaRegBookmark />} Bookmark
              </button>
              {/* Bookmark Count */}
              <p className="flex justify-center text-dimWhite text-[12px] my-1">
                Followed by {bookmarkCount} people
              </p>
              {/* Manga Rating */}
              <div>
                <div
                  className="w-full flex justify-between items-center bg-quinary px-2 p-[2px] rounded-md text-dimWhite"
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <div className="h-full pb-1 flex flex-col items-center">
                    {hover ? (
                      <InteractiveStarRating manga={manga} />
                    ) : (
                      <StarRating rating={manga.rating} includeText={false} />
                    )}
                  </div>
                  {manga.rating}
                </div>
                {/* Status / Type */}
                {editing ? (
                  <>
                    <SideInfoInput label1={"Status"} label2={"Type"} />
                  </>
                ) : (
                  <>
                    <SideInfo label="Status" value={manga.status} />
                    <SideInfo
                      label="Type"
                      value={manga.type}
                      isHoverable={true}
                    />
                  </>
                )}
              </div>
            </div>
            {/* Right Side */}
            <div id="right" className="ml-4 text-white w-full">
              {/* Title - Summary - Description */}
              <div className="flex justify-between">
                {editing ? (
                  <input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-[550px] min-h-[34px] px-4 rounded-sm border-2 border-quaternary bg-secondary text-white hover:cursor-pointer hover:text-primary"
                  />
                ) : (
                  <h2 className="font-bold text-[20px] line-clamp-1 text-ellipsis">
                    {manga.mangaTitle}
                  </h2>
                )}
              </div>
              <h3 className="mt-3 font-semibold">Summary</h3>
              {editing ? (
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-[550px] min-h-[34px] px-4 rounded-sm border-2 border-quaternary bg-secondary text-white hover:cursor-pointer hover:text-primary"
                  style={{
                    height: "34px",
                    maxHeight: "400px",
                    lineHeight: "30px",
                  }}
                />
              ) : (
                <p className="mt-1 text-dimWhite text-[14px]">
                  {manga.description}
                </p>
              )}

              {/* Short Info Tags */}
              <BodyInfo
                lLabel={"Released"}
                lValue={manga.released || "-"}
                rLabel={"Author"}
                rValue={manga.author || "-"}
                editing={editing}
              />
              <BodyInfo
                lLabel={"Artist"}
                lValue={manga.artist || "-"}
                rLabel={""}
                rValue={""}
                editing={editing}
              />
              <BodyInfo
                lLabel={"Serialisation"}
                lValue={manga.serialisation || "-"}
                rLabel={"Posted By"}
                rValue={manga.postedBy || "-"}
                editing={editing}
              />
              <BodyInfo
                lLabel={"Posted On"}
                lValue={getFormattedDate(manga.postedOn) || "-"}
                rLabel={"Updated On"}
                rValue={
                  manga.chapters.length > 0
                    ? getFormattedDate(manga.chapters[0].uploadDate)
                    : "-"
                }
                editable={false}
                editing={editing}
              />
              <div className="flex flex-col">
                <div className="text-[14px] mt-4">Genres</div>
                <div className="flex flex-wrap text-[14px]">
                  {genres.map((genre, index) => (
                    <Link to={`/comics?genre=${genre}`} key={index}>
                      <div
                        className={`flex items-center ${
                          editing ? "bg-secondary" : "bg-quinary"
                        } rounded-md py-1 px-3 mt-2 transition-colors duration-300 hover:cursor-pointer hover:text-primary ${
                          index > 0 ? "ml-2" : "ml-0"
                        }`}
                      >
                        {genre}
                      </div>
                    </Link>
                  ))}

                  {editing && (
                    <TagDropDown
                      initiallySelected={manga.genres}
                      genres={genres}
                      setGenres={setGenres}
                      addGenres={addGenres}
                      setAddGenres={setAddGenres}
                      removeGenres={removeGenres}
                      setRemoveGenres={setRemoveGenres}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Chapters */}
          <MangaChapters
            manga={manga}
            reverseChapters={reverseChapters}
            getFormattedDate={getFormattedDate}
          />
          <Comments />
        </>
      )}
    </section>
  );
}
