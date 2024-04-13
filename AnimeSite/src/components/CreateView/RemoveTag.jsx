import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

import Separator from "../Separator";

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
  const [tag, setTag] = useState("Tag");

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
            {customInputField("text", "Tag", tag, setTag, 2)}
            <button className="h-[30px] bg-red-600 ml-5 mt-2 px-3 rounded-md text-white text-[13px] hover:bg-red-800">
              Remove
            </button>
          </form>
        </>
      )}
    </section>
  );
}
