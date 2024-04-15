import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Feedback from "./Feedback";
import { useState } from "react";
import axios from "axios";

import Separator from "../Separator";

export default function CreateTag({ customInputField, toggleRefresh }) {
  const [collapsed, setCollapsed] = useState(false);
  const [tag, setTag] = useState("Tag");
  const [isTransitioned, setIsTransitioned] = useState(false);
  const [text, setText] = useState("");
  const [color, setColor] = useState("");
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

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "/api/createTag",
        { genre: capitalizeWords(tag) },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        switch (response.data) {
          case "success":
            setColor(`bg-green-600`);
            setText(`Successfully created ${capitalizeWords(tag)}!`);
            setTag(""); // Clean-up input field.
            toggleRefresh(); // Refresh delete list.
            break;
          case "error":
            setColor(`bg-red-600`);
            setText(`${capitalizeWords(tag)} already exists!`);
            break;
        }
        handleTransition();
      })
      .catch((error) => console.error("Error adding tag:", error));
  };

  return (
    <section className="w-full h-auto py-1 bg-quaternary rounded-sm mt-5">
      <div className="flex justify-between my-4 mx-4 text-white items-center">
        <p>Create Genre</p>
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
            className="flex justify-center items-center pb-5"
            onSubmit={(e) => handleSubmit(e)}
          >
            {customInputField("text", "Tag", tag, setTag, 2)}
            <button className="h-[30px] bg-primary ml-5 mt-2 px-3 rounded-md text-white text-[13px] hover:bg-purple-800">
              Create
            </button>
          </form>
        </>
      )}
    </section>
  );
}
