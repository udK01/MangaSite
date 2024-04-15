import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Separator from "../Separator";
import DropDown from "../DropDown";

export default function AddChapter({ customInputField }) {
  const [collapsed, setCollapsed] = useState(false);
  const [title, setTitle] = useState("Title");
  const [chapterNum, setChapterNum] = useState("0");
  const [chapterContent, setChapterContent] = useState("Chapter Content");
  const [mangas, setMangas] = useState([]);
  const [manga, setManga] = useState("Please Select");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/mangas")
      .then((response) => setMangas(response.data))
      .catch((error) => console.error(`Failed to fetch mangas:`, error));
  }, []);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "/api/createChapter",
        {}, // Body stuff.
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(`Failed to create chapter:`, error);
      });
  };

  function formatOptions() {
    let options = [];
    mangas && mangas.map((manga) => options.push(manga.mangaTitle));
    return options.sort((a, b) => a.localeCompare(b));
  }

  return (
    <section className="w-full h-auto py-1 bg-quaternary rounded-sm mt-5">
      {/* Title and Collapse Indicator */}
      <div className="flex justify-between my-4 mx-4 text-white items-center">
        <p>Add Chapter</p>
        <button onClick={handleToggleCollapse} className="text-white">
          {collapsed ? <FaChevronDown /> : <FaChevronUp />}
        </button>
      </div>
      {!collapsed && (
        <>
          <Separator />
          <form
            className="flex flex-col justify-center items-center pb-5 text-[13px]"
            onSubmit={(e) => handleSubmit(e)}
          >
            {/* Input Fields */}
            <DropDown
              options={formatOptions()}
              value={manga}
              func={setManga}
              className={"w-[346px] px-4"}
            />
            {customInputField("text", "Title", title, setTitle, 2)}
            {customInputField("number", "0", chapterNum, setChapterNum, 2)}
            {customInputField(
              "text",
              "Chapter Content",
              chapterContent,
              setChapterContent,
              2
            )}
            {/* Buttons */}
            <div className="w-[350px] flex justify-between mx-auto mt-5 text-white font-poppins">
              <Link to={"/"} className="bg-red-600 px-4 py-2 rounded-md">
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-primary ml-5 px-4 py-2 rounded-md"
              >
                Add Chapter
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
