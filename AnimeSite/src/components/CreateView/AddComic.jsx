import TagDropDown from "../InspectView/TagDropDown";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import CalendarPopup from "./CalendarPopup";
import Separator from "../Separator";
import DropDown from "../DropDown";

export default function AddComic({ customInputField }) {
  const [title, setTitle] = useState("Title");
  const [description, setDescription] = useState("Description");
  const [author, setAuthor] = useState("Author");
  const [status, setStatus] = useState("OnGoing");
  const [type, setType] = useState("Manhwa");
  const [artist, setArtist] = useState("Artist");
  const [postedBy, setPostedBy] = useState("Posted-By");
  const [postedOn, setPostedOn] = useState(new Date());
  const [released, setReleased] = useState("Released");
  const [serialisation, setSerialisation] = useState("Serialisation");
  const [genres, setGenres] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  function handleAddComic(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("mangaTitle", title);
    formData.append("mangaImage", image);
    formData.append("imagePath", image && `../../thumbnails/${image.name}`);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("author", author === "Author" ? "-" : author);
    formData.append("status", status);
    formData.append("artist", artist === "Artist" ? "-" : artist);
    formData.append("postedBy", postedBy === "Posted-By" ? "-" : postedBy);
    formData.append("postedOn", formatDate());
    formData.append("released", released === "Released" ? "-" : released);
    formData.append(
      "serialisation",
      serialisation === "Serialisation" ? "-" : serialisation
    );
    formData.append("genres", genres);

    axios
      .post("/api/createComic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(`Failed to create comic:`, error);
      });
  }

  function formatDate() {
    const date = new Date(postedOn);

    const year = padZero(date.getFullYear());
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());

    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  function sortGenres(genres) {
    return genres.sort((a, b) => a.localeCompare(b));
  }

  function padZero(n) {
    return (n < 10 ? "0" : "") + n;
  }

  // Drag & Drop Image Funtions
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

  return (
    // Container
    <section
      className="w-full h-auto py-1 bg-quaternary rounded-sm"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Add Comic Text */}
      <div className="flex justify-between my-4 mx-4 text-white items-center">
        <p>Add Comic</p>
        <button onClick={handleToggleCollapse} className="text-white">
          {collapsed ? <FaChevronDown /> : <FaChevronUp />}
        </button>
      </div>
      {!collapsed && (
        <>
          <Separator />
          {/* Form */}
          <form
            onSubmit={handleAddComic}
            className="my-4 mx-4 p-2 rounded-md text-[13px]"
          >
            {/* Input Fields */}
            <div className="w-full flex flex-col items-center justify-center">
              {customInputField("text", "Title", title, setTitle)}
              {customInputField(
                "text",
                "Description",
                description,
                setDescription,
                2
              )}
              <DropDown
                options={["Manhwa", "Manga", "Manhua"]}
                value={type}
                func={setType}
                className={"w-[350px] px-4"}
              />
              {customInputField("text", "Released", released, setReleased, 2)}
              {customInputField("text", "Author", author, setAuthor, 2)}
              <DropDown
                options={[
                  "OnGoing",
                  "Completed",
                  "Hiatus",
                  "Dropped",
                  "Coming Soon",
                ]}
                value={status}
                func={setStatus}
                className={"w-[350px] px-4"}
              />
              {customInputField("text", "Artist", artist, setArtist, 2)}
              {customInputField(
                "text",
                "Serialisation",
                serialisation,
                setSerialisation,
                2
              )}
              {customInputField("text", "Posted-By", postedBy, setPostedBy, 2)}
              <CalendarPopup
                selectedDate={postedOn}
                setSelectedDate={setPostedOn}
              />
              {/* Genres */}
              <div className="relative">
                <div className="w-[350px] min-h-[34px] flex flex-wrap bg-secondary mt-2 p-2 rounded-md relative">
                  {/* Edit Button */}
                  <div className={`absolute bottom-1 right-1 text-white`}>
                    <TagDropDown
                      initiallySelected={[]}
                      genres={genres}
                      setGenres={setGenres}
                      addGenres={[]}
                      setAddGenres={() => {}}
                      removeGenres={[]}
                      setRemoveGenres={() => {}}
                    />
                  </div>
                  {genres.length === 0 ? (
                    <div className="text-white ml-2 font-poppins">Genres</div>
                  ) : (
                    ""
                  )}
                  {sortGenres(genres).map((genre, index) => (
                    <div
                      key={index}
                      className={`flex bg-white items-center rounded-md py-1 px-3 mt-2 transition-colors duration-300 hover:cursor-pointer hover:text-primary ${
                        index > 0 ? "ml-2" : "ml-0"
                      }`}
                    >
                      {genre}
                    </div>
                  ))}
                </div>
              </div>
              {/* Image Upload */}
              <div className="flex w-[350px] h-[34px] bg-secondary justify-center items-center mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-white hover:text-primary"
                >
                  Drag & Drop or Click to Upload Image
                </label>
              </div>
              {/* Image Display */}
              {image && (
                <p className="text-white mt-2">Selected Image: {image.name}</p>
              )}
            </div>
            {/* Buttons */}
            <div className="w-[350px] flex justify-between mx-auto mt-5 text-white font-poppins">
              <Link to={"/"} className="bg-red-600 px-4 py-2 rounded-md">
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-primary ml-5 px-4 py-2 rounded-md"
              >
                Add Comic
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
