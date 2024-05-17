import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ComicDropdown = ({
  options,
  value,
  func,
  multiOptional = false,
  genresSelected,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedBoxes, setCheckedBoxes] = useState(genresSelected);
  const dropdownRef = useRef();

  useEffect(() => {
    if (Array.isArray(genresSelected)) {
      setCheckedBoxes(genresSelected);
    }
  }, [genresSelected]);

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
  const toggleCheckbox = (genre) => {
    let updatedCheckedBoxes;
    if (checkedBoxes.includes(genre)) {
      updatedCheckedBoxes = checkedBoxes.filter((tag) => tag !== genre);
    } else {
      updatedCheckedBoxes = [...checkedBoxes, genre];
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
            <div
              key={index}
              className="flex items-center mr-4 md:w-[150px] 2xs:w-[210px]"
            >
              {multiOptional ? (
                <input
                  type="checkbox"
                  id={`checkbox-${i + index}`}
                  checked={checkedBoxes.includes(option)}
                  onChange={() => toggleCheckbox(option)}
                  className="mr-2 ml-5"
                />
              ) : (
                <input
                  type="radio"
                  name="type"
                  id={`radio-${i + index}`}
                  checked={value === option}
                  onChange={() => func(option)}
                  className="mr-2 ml-5"
                />
              )}
              <label
                htmlFor={`checkbox-${i + index}`}
                className="cursor-pointer hover:text-primary whitespace-nowrap overflow-hidden overflow-ellipsis"
                onClick={() => func(option)}
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <div
      className="relative font-poppins hover:cursor-pointer"
      ref={dropdownRef}
    >
      {/* Button */}
      <div
        className={`ml-[18px] md:text-[16px] 2xs:text-[20px] flex items-center justify-between px-3 md:w-[145px] 2xs:w-[200px] bg-quinary rounded-sm hover:bg-primary`}
        onClick={toggleDropdown}
      >
        <div>{value}</div>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {/* Drop Down */}
      {isOpen && (
        <div className="scrollbar-thumb-primary scrollbar-track-transparent">
          <div
            className={`w-auto md:max-w-[825px] 2xs:max-w-[1100px] ${className} absolute mt-1 bg-secondary text-white border-2 border-primary scrollbar-thin max-h-[200px] overflow-y-auto z-10`}
          >
            {renderOptions()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComicDropdown;
