import "./modal.scss";
import PropTypes from "prop-types";
import { add } from "../../app/slices/colorsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import hexToRgba from "hex-to-rgba";

function Modal({ setIsModalOpen }) {
  const { colorsData } = useSelector((state) => state.colors);
  const [colorName, setColorName] = useState("");
  const [colorCode, setColorCode] = useState("#000000");
  const [inputError, setInputError] = useState(null);
  const dispatch = useDispatch();

  const addColor = (e, colorName, colorCode) => {
    e.preventDefault();

    if (colorName === "") {
      setInputError("*You must enter color name");
      return;
    }

    const nameIsAlreadyTaken = () => {
      return colorsData.colors.find((color) => color.name === colorName);
    };

    if (nameIsAlreadyTaken()) {
      setInputError("*Name already taken, change color name");
      return;
    }

    const hexValue = colorCode.slice(1, colorCode.length);
    const rgbValue = hexToRgba(hexValue).match(/\d+/g);

    dispatch(
      add({
        name: colorName,
        hex: hexValue,
        rgb: `${rgbValue[0]}, ${rgbValue[1]}, ${rgbValue[2]}`,
      })
    );

    setIsModalOpen(false);
  };

  return (
    <>
      <div className="modal">
        <div className="modal-top">
          <div className="modal-title">New Color</div>

          <div className="modal-title-right">
            {inputError && <span>{inputError}</span>}
            <button type="button" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
          </div>
        </div>

        <form className="modal-body">
          <div className="modal-body-top">
            <input
              type="color"
              className="color-input"
              value={colorCode}
              onChange={(e) => setColorCode(e.target.value)}
            />
            <input
              type="text"
              className="color-name-input"
              placeholder="Color name..."
              value={colorName}
              onChange={(e) => {
                setColorName(e.target.value);
                setInputError(null);
              }}
              required
            />
          </div>

          <button
            type="submit"
            className="add-color-btn"
            onClick={(e) => addColor(e, colorName, colorCode)}
          >
            Add Color
          </button>
        </form>
      </div>
      <div className="overlay"></div>
    </>
  );
}

Modal.propTypes = {
  setIsModalOpen: PropTypes.func,
};

export default Modal;
