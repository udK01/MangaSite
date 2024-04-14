import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

import Separator from "../Separator";
import DropDown from "../DropDown";

/**
 * Need to make database function for removing tag,
 * ensure it cascades to other tables.
 *
 * Need to complete server API to remove tag.
 *
 * Need to complete UI with dropdown containing all
 * existing tags for remove tag.
 *
 */

export default function RemoveTag({ customInputField }) {
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

    axios
      .post(
        "/api/removeTag",
        { genre: tag },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => setTag("Tag"))
      .catch((error) => console.error("Error removing tag:", error));
  };

  function DropDown() {
    return (
      <div
        className={`w-[350px] px-3 mt-2 rounded-sm border-2 border-quaternary h-[34px] bg-secondary text-white hover:cursor-pointer hover:text-primary`}
      >
        <select
          id="dropdown"
          value={tag}
          onChange={(event) => setTag(event.target.value)}
          className={`w-full h-full bg-transparent border-quaternary focus:bg-secondary focus:outline-none hover:cursor-pointer`}
        >
          {tags.map((tag, i) => (
            <option key={i} value={tag.genreTag}>
              {tag.genreTag}
            </option>
          ))}
        </select>
      </div>
    );
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
            {DropDown()}
            <button className="h-[30px] bg-red-600 ml-5 mt-2 px-3 rounded-md text-white text-[13px] hover:bg-red-800">
              Remove
            </button>
          </form>
        </>
      )}
    </section>
  );
}
