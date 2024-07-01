import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import dateFormatter from "../InspectView/DateFormatter";
import Separator from "../Separator";
import DropDown from "../DropDown";
import Feedback from "./Feedback";

import ComicsProvider from "../ComicsProvider";

export default function AddChapter({ customInputField }) {
  const [collapsed, setCollapsed] = useState(false);

  const { comics } = useContext(ComicsProvider);

  const [title, setTitle] = useState("Title");
  const [chapterContent, setChapterContent] = useState("Chapter Content");
  const [manga, setManga] = useState("Please Select");

  const [color, setColor] = useState("");
  const [text, setText] = useState("");

  const [isTransitioned, setIsTransitioned] = useState(false);
  let timer;

  const handleTransition = () => {
    clearTimeout(timer);
    setIsTransitioned(true);
    timer = setTimeout(() => {
      setIsTransitioned(false);
    }, 3000);
  };

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (manga === "Please Select") {
      setColor(`bg-red-600`);
      setText(`Please Select A Manga!`);
      handleTransition();
      return null;
    }

    axios
      .post(
        "/api/createChapter",
        {
          mangaID: getMangaID(),
          chapterTitle: title === "Title" ? "" : title,
          chapterContent: chapterContent,
          uploadDate: dateFormatter.createFormattedDate(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        {
          const mangaIndex = comics.findIndex(
            (manga) => manga.mangaID === getMangaID()
          );
          comics[mangaIndex].chapters = response.data;
        }
        setColor(`bg-green-600`);
        setText(`Successfully created new chapter for ${manga}!`);
        handleTransition();
      })
      .catch((error) => {
        console.error(`Failed to create chapter:`, error);
      });
  };

  function formatOptions() {
    let options = [];
    comics.map((manga) => options.push(manga.mangaTitle));
    return options.sort((a, b) => a.localeCompare(b));
  }

  function getMangaID() {
    return comics.find((m) => m.mangaTitle === manga).mangaID;
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
          {isTransitioned && (
            <Feedback
              color={color}
              text={text}
              handleTransition={handleTransition}
            />
          )}

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
