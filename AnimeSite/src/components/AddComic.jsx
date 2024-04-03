import { Link } from "react-router-dom";
import Separator from "./Separator";
import { useState } from "react";

export default function AddComic() {
  const [title, setTitle] = useState("Title");
  const [description, setDescription] = useState("Description");
  const [author, setAuthor] = useState("Author");
  const [status, setStatus] = useState("Status");

  const [type, setType] = useState("");

  const [image, setImage] = useState(null);

  function handleAddComic(event) {
    event.preventDefault();
    // Here you can handle the image upload logic, such as sending it to the server
    // For demonstration, let's just log the title and image
    console.log("Title:", title);
    console.log("Description:", Description);
    console.log("Image:", image);
    console.log("Author:", author);
    console.log("Status:", status);
  }

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

  function dropdown() {
    function handleSelectChange(event) {
      setType(event.target.value);
    }

    return (
      <div
        className={`w-[350px] h-[34px] px-4 mt-2 rounded-sm border-2 border-quaternary bg-secondary text-white hover:cursor-pointer hover:text-primary`}
      >
        <select
          id="dropdown"
          value={type}
          onChange={handleSelectChange}
          className="bg-transparent w-full h-full border-quaternary focus:bg-secondary focus:outline-none focus:text-primary"
        >
          <option value="manhwa">Manhwa</option>
          <option value="manga">Manga</option>
          <option value="manhua">Manhua</option>
        </select>
      </div>
    );
  }

  function customInputField(type, placeholder, value, func, mt = 0) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => func(e.target.value)}
        onFocus={(e) => {
          if (e.target.value === placeholder) {
            func("");
          }
        }}
        onBlur={(e) => {
          if (e.target.value === "") {
            func(placeholder);
          }
        }}
        className={`w-[350px] h-[34px] px-4 mt-${mt} rounded-sm border-2 border-quaternary bg-secondary text-white hover:cursor-pointer hover:text-primary`}
      />
    );
  }

  return (
    // Container
    <section
      className="w-[826px] h-[460px] bg-quaternary rounded-sm font-poppins"
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
          {dropdown()}
          {customInputField("text", "Author", author, setAuthor, 2)}
          {customInputField("text", "Status", status, setStatus, 2)}

          {/* Image Upload */}
          <div className="flex w-[350px] h-[34px] bg-secondary justify-center items-center mt-4">
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
        <div className="w-[350px] flex justify-between mx-auto mt-10 text-white font-poppins">
          <Link to={"/"} className="bg-red-600 px-4 py-2 rounded-md">
            Cancel
          </Link>
          <Link
            to={"/"}
            type="submit"
            className="bg-primary ml-5 px-4 py-2 rounded-md"
          >
            Add Comic
          </Link>
        </div>
      </form>
    </section>
  );
}
