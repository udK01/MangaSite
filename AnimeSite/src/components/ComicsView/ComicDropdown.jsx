import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ComicDropdown = ({ options, value, func }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to toggle checkbox
  const toggleCheckbox = (genreTag) => {
    let updatedCheckedBoxes;
    if (checkedBoxes.includes(genreTag)) {
      updatedCheckedBoxes = checkedBoxes.filter((tag) => tag !== genreTag);
    } else {
      updatedCheckedBoxes = [...checkedBoxes, genreTag];
    }
    setCheckedBoxes(updatedCheckedBoxes);
    func(updatedCheckedBoxes);
  };

  // Function to render checkboxes and options
  const renderOptions = () => {
    const rows = [];
    for (let i = 0; i < options.length; i += 5) {
      const rowOptions = options.slice(i, i + 5);
      rows.push(
        <div key={i} className="flex items-center">
          {rowOptions.map((option, index) => (
            <div key={index} className="flex items-center mr-4 w-[150px]">
              <input
                type="checkbox"
                id={`checkbox-${i + index}`}
                checked={checkedBoxes.includes(option.genreTag)}
                onChange={() => toggleCheckbox(option.genreTag)}
                className="mr-2 ml-5"
              />
              <label
                htmlFor={`checkbox-${i + index}`}
                className="cursor-pointer hover:text-primary whitespace-nowrap overflow-hidden overflow-ellipsis"
              >
                {option.genreTag}
              </label>
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="relative font-poppins" ref={dropdownRef}>
      {/* Button */}
      <div
        className={`ml-[17px] flex items-center justify-between px-3 w-[150px] bg-quinary rounded-sm hover:bg-primary`}
        onClick={toggleDropdown}
      >
        <div>{value}</div>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {/* Drop Down */}
      {isOpen && (
        <div className="scrollbar-thumb-primary scrollbar-track-transparent">
          <div
            className={`w-[854px] absolute mt-1 bg-secondary text-white border-2 border-primary scrollbar-thin max-h-[200px] overflow-y-auto z-10`}
          >
            {renderOptions()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComicDropdown;
