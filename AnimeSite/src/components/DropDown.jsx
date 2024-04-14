import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const DropDown = ({
  options,
  value,
  func,
  className,
  inspectWidth = className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleItemClick = (option) => {
    func(option);
    setIsOpen(false);
  };

  return (
    <div className="relative font-poppins" ref={dropdownRef}>
      <div
        className={`flex ${className} h-[34px] items-center justify-between bg-secondary mt-2 text-white hover:text-primary hover:cursor-pointer`}
        onClick={toggleDropdown}
      >
        <div>{value}</div>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isOpen && (
        <div className="scrollbar-thumb-primary scrollbar-track-transparent">
          <div
            className={`absolute mt-1 bg-secondary ${inspectWidth} text-white border-2 border-primary scrollbar-thin max-h-[200px] overflow-y-auto z-10`}
          >
            {options.map((option, index) => (
              <div
                key={index}
                className="py-2 cursor-pointer hover:text-primary"
                onClick={() => handleItemClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
