import "./colors-list.scss";
import { useSelector } from "react-redux";
import ColorItem from "../ColorItem/ColorItem";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";

function ColorsList() {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { colorsData } = useSelector((state) => state.colors);
  const [filteredColors, setFilteredColors] = useState([]);
  const [noMatching, setNoMatching] = useState(false);

  useEffect(() => {
    const regex = new RegExp(searchText, "i");

    if (colorsData.colors) {
      const filtered = colorsData.colors.filter((color) =>
        regex.test(color.name)
      );
      filtered.length === 0 ? setNoMatching(true) : setNoMatching(false);
      setFilteredColors(filtered);
    }
  }, [searchText, colorsData]);

  return (
    <div className="colors-container">
      <div className="colors-container-top">
        <div className="container-input">
          <input
            type="text"
            name="text"
            className="input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
          />
          <button className="search__btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={22}
              height={22}
            >
              <path
                d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                fill="#efeff1"
              />
            </svg>
          </button>
        </div>

        <button
          type="button"
          className="button"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="button__text">Add Color</span>
          <span className="button__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              viewBox="0 0 24 24"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="currentColor"
              height={24}
              fill="none"
              className="svg"
            >
              <line y2={19} y1={5} x2={12} x1={12} />
              <line y2={12} y1={12} x2={19} x1={5} />
            </svg>
          </span>
        </button>
      </div>

      <div className="colors-list">
        {colorsData.colors &&
          filteredColors.length === 0 &&
          noMatching !== true &&
          colorsData.colors.map((colorItem) => {
            return <ColorItem key={colorItem.name} colorItem={colorItem} />;
          })}

        {colorsData.colors &&
          filteredColors.length !== 0 &&
          noMatching === false &&
          filteredColors.map((colorItem) => {
            return <ColorItem key={colorItem.name} colorItem={colorItem} />;
          })}

        {filteredColors.length === 0 && noMatching === true && (
          <div className="no-match">No matching colors found.</div>
        )}
      </div>

      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}

export default ColorsList;
