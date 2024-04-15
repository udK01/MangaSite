import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import Feedback from "./Feedback";
import axios from "axios";

import Separator from "../Separator";
import DropDown from "../DropDown";

/**
 *
 * Make sure freshly added tags show up.
 *
 */

export default function DeleteTag({ refresh, toggleRefresh }) {
  const [collapsed, setCollapsed] = useState(false);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("Please Select");
  const [deletedTag, setDeletedTag] = useState("");
  const [isTransitioned, setIsTransitioned] = useState(false);
  let timer;

  useEffect(() => {
    axios
      .get("/api/getGenres")
      .then((response) => setTags(response.data))
      .catch((error) => console.error(`Failed to fetch genres:`, error));
  }, [refresh]);

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

    if (tag !== "Please Select") {
      axios
        .post(
          "/api/deleteTag",
          { genre: tag },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          handleTransition();
          setDeletedTag(tag);
          toggleRefresh();
          setTag("Please Select");
        })
        .catch((error) => console.error("Error removing tag:", error));
    }
  };

  function formatOptions() {
    let options = [];
    tags[0] && tags[0].map((tag) => options.push(tag.genreTag));
    return options;
  }

  return (
    <section className="w-full h-auto py-1 bg-quaternary rounded-sm mt-5">
      <div className="flex justify-between my-4 mx-4 text-white items-center">
        <p>Delete Genre</p>
        <button onClick={handleToggleCollapse} className="text-white">
          {collapsed ? <FaChevronDown /> : <FaChevronUp />}
        </button>
      </div>

      {!collapsed && (
        <>
          <Separator />
          {isTransitioned && (
            <Feedback
              color={"bg-green-600"}
              text={`Successfully deleted ${deletedTag}!`}
              handleTransition={handleTransition}
            />
          )}

          <form
            className="flex justify-center items-center pb-5"
            onSubmit={(e) => handleSubmit(e)}
          >
            <DropDown
              options={formatOptions()}
              value={tag}
              func={setTag}
              className={"w-[350px] px-4"}
            />
            <button className="h-[30px] bg-red-600 ml-5 mt-2 px-3 rounded-md text-white text-[13px] hover:bg-red-800">
              Remove
            </button>
          </form>
        </>
      )}
    </section>
  );
}
