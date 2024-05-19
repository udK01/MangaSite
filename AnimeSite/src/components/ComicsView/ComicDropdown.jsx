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
    return (
      <div className="flex flex-wrap items-center">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex items-center md:w-1/6 md:ml-[25px] 2xs:ml-0 2xs:w-1/2 mb-1"
          >
            {multiOptional ? (
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                checked={checkedBoxes.includes(option)}
                onChange={() => toggleCheckbox(option)}
              />
            ) : (
              <input
                type="radio"
                name="type"
                id={`radio-${index}`}
                checked={value === option}
                onChange={() => func(option)}
                className="ml-2"
              />
            )}
            <label
              htmlFor={`checkbox-${index}`}
              className="ml-2 cursor-pointer hover:text-primary whitespace-nowrap overflow-hidden overflow-ellipsis"
              onClick={() => func(option)}
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="relative font-poppins hover:cursor-pointer"
      ref={dropdownRef}
    >
      {/* Button */}
      <div
        className={`mr-[18px] md:w-[145px] 2xs:w-full flex items-center justify-between px-3 text-[16px] bg-quinary rounded-sm hover:bg-primary`}
        onClick={toggleDropdown}
      >
        <div>{value}</div>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {/* Drop Down */}
      {isOpen && (
        <div className="scrollbar-thumb-primary scrollbar-track-transparent">
          <div
            className={`md:w-screen 2xs:w-fit md:max-w-[825px] ${className} absolute mt-1 bg-secondary text-white border-2 border-primary scrollbar-thin max-h-[200px] overflow-y-auto z-10`}
          >
            {renderOptions()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComicDropdown;
