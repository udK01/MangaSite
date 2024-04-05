import { Link, useNavigate } from "react-router-dom";
import Separator from "./Separator";
import { useState } from "react";
import axios from "axios";
import CalendarPopup from "./CalendarPopup";

export default function AddComic() {
  const [title, setTitle] = useState("Title");
  const [description, setDescription] = useState("Description");
  const [author, setAuthor] = useState("Author");
  const [status, setStatus] = useState("OnGoing");
  const [artist, setArtist] = useState("Artist");
  const [postedBy, setPostedBy] = useState("Posted-By");
  const [postedOn, setPostedOn] = useState(new Date());

  const [type, setType] = useState("Manhwa");
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  function handleAddComic(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("mangaTitle", title);
    formData.append("mangaImage", image);
    formData.append("imagePath", `../../thumbnails/${image.name}`);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("author", author);
    formData.append("status", status);
    formData.append("artist", artist);
    formData.append("postedBy", postedBy);
    formData.append("postedOn", formatDate());

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

  // DrowDown
  function dropdown(options, dropdownType) {
    function handleTypeChange(event) {
      console.log("Type");
      setType(event.target.value);
    }

    function handleStatusChange(event) {
      console.log("Status");
      setStatus(event.target.value);
    }

    return (
      <div
        className={`w-[350px] h-[34px] px-3 mt-2 rounded-sm border-2 border-quaternary bg-secondary text-white hover:cursor-pointer hover:text-primary`}
      >
        <select
          id="dropdown"
          value={dropdownType === "type" ? type : status}
          onChange={
            dropdownType === "type" ? handleTypeChange : handleStatusChange
          }
          className="bg-transparent w-full h-full border-quaternary focus:bg-secondary focus:outline-none"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          {/* <option value="manhwa">Manhwa</option>
          <option value="manga">Manga</option>
          <option value="manhua">Manhua</option> */}
        </select>
      </div>
    );
  }

  function customInputField(type, placeholder, value, func, mt = 0) {
    const commonProps = {
      placeholder: placeholder,
      value: value,
      onChange: (e) => func(e.target.value),
      onFocus: (e) => {
        if (e.target.value === placeholder) {
          func("");
        }
      },
      onBlur: (e) => {
        if (e.target.value === "") {
          func(placeholder);
        }
      },
      className: `w-[350px] min-h-[34px] px-4 mt-${mt} rounded-sm border-2 border-quaternary bg-secondary text-white hover:cursor-pointer hover:text-primary`,
    };

    return (
      <>
        {placeholder === "Description" ? (
          <textarea
            {...commonProps}
            style={{ height: "34px", maxHeight: "400px", lineHeight: "30px" }}
          />
        ) : (
          <input {...commonProps} type={type} />
        )}
      </>
    );
  }

  return (
    // Container
    <section
      className="w-[826px] h-auto bg-quaternary rounded-sm font-poppins"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Add Comic Text */}
      <div className="flex justify-between my-4 mx-4 text-white">
        <p>Add Comic</p>
      </div>
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
          {dropdown(["Manhwa", "Manga", "Manhua"], "type")}
          {customInputField("text", "Author", author, setAuthor, 2)}
          {dropdown(
            ["OnGoing", "Completed", "Hiatus", "Dropped", "Coming Soon"],
            "status"
          )}
          {customInputField("text", "Artist", artist, setArtist, 2)}
          {customInputField("text", "Posted-By", postedBy, setPostedBy, 2)}
          <CalendarPopup
            selectedDate={postedOn}
            setSelectedDate={setPostedOn}
          />

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
    </section>
  );
}
