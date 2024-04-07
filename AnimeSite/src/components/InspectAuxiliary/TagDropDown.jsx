import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Dropdown = ({
  genres,
  addGenres,
  setAddGenres,
  removeGenres,
  setRemoveGenres,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(genres);
  const [allGenres, setAllGenres] = useState([]);
  const dropdownRef = useRef();

  useEffect(() => {
    axios
      .get(`/api/getGenres`)
      .then((response) => setAllGenres(response.data[0]))
      .catch((error) => console.error(`Error fetching data:`, error));
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    // Check if the item is already selected
    if (selectedItems.includes(item)) {
      // Deselect the item
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
      // If the item was initially selected and is deselected now, add it to removeGenres
      if (genres.includes(item) && !addGenres.includes(item)) {
        setRemoveGenres([...removeGenres, item]);
      }
      // If the item was not initially selected and is deselected now, remove it from addGenres
      if (!genres.includes(item) && addGenres.includes(item)) {
        setAddGenres(addGenres.filter((genre) => genre !== item));
      }
    } else {
      // Select the item
      setSelectedItems([...selectedItems, item]);
      // If the item was initially selected and is selected now, remove it from removeGenres
      if (genres.includes(item) && removeGenres.includes(item)) {
        setRemoveGenres(removeGenres.filter((genre) => genre !== item));
      }
      // If the item was not initially selected and is selected now, add it to addGenres
      if (!genres.includes(item) && !addGenres.includes(item)) {
        setAddGenres([...addGenres, item]);
      }
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative font-poppins" ref={dropdownRef}>
      <div
        className="flex items-center bg-secondary rounded-md px-3 py-1 mt-2 ml-2 hover:text-primary hover:cursor-pointer"
        onClick={toggleDropdown}
      >
        +
      </div>
      {isOpen && (
        <div className="scrollbar-thumb-primary scrollbar-track-transparent">
          <div className="absolute mt-1 bg-secondary rounded-md shadow-lg w-[200px] border-2 border-primary scrollbar-thin max-h-[200px] overflow-y-scroll">
            <ul className="py-1">
              {allGenres.map((genre, index) => (
                <li
                  key={index}
                  className="cursor-pointer flex justify-between items-center px-4 py-2 hover:text-primary"
                  onClick={() => handleItemClick(genre.genreTag)}
                >
                  <span>{genre.genreTag}</span>
                  {selectedItems.includes(genre.genreTag) && (
                    <span>&#10003;</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
