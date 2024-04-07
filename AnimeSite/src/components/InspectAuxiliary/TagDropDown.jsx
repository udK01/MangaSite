import React, { useState, useEffect, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const Dropdown = ({
  initiallySelected,
  genres,
  setGenres,
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
    if (selectedItems.includes(item)) {
      // Item was initially selected, now deselected
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
      setGenres(genres.filter((genre) => genre !== item));
      if (initiallySelected.includes(item)) {
        setRemoveGenres([...removeGenres, item]);
      }
      // Remove from Add list
      setAddGenres(addGenres.filter((genre) => genre !== item));
    } else {
      // Item initially not Selected, now selected
      setSelectedItems([...selectedItems, item]);
      setGenres([...genres, item]);
      if (!initiallySelected.includes(item)) {
        setAddGenres([...addGenres, item]);
      }
      // Remove from Remove list
      setRemoveGenres(removeGenres.filter((genre) => genre !== item));
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
        className="flex items-center bg-secondary rounded-md px-3 py-2 mt-2 ml-2 hover:text-primary hover:cursor-pointer"
        onClick={toggleDropdown}
      >
        <FaEdit />
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
