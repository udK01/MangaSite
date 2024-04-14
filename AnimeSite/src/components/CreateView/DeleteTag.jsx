import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

import Separator from "../Separator";
import DropDown from "../DropDown";

/**
 *
 * Add visual feedback.
 *
 */

export default function DeleteTag() {
  const [collapsed, setCollapsed] = useState(false);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("Please Select");

  useEffect(() => {
    axios
      .get("/api/getGenres")
      .then((response) => setTags(response.data))
      .catch((error) => console.error(`Failed to fetch genres:`, error));
  }, []);

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
        .then(() => setTag("Tag"))
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
            <button
              className="h-[30px] bg-red-600 ml-5 mt-2 px-3 rounded-md text-white text-[13px] hover:bg-red-800"
              onClick={() => console.log(tag)}
            >
              Remove
            </button>
          </form>
        </>
      )}
    </section>
  );
}
