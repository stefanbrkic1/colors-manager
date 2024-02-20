import "./color-item.scss";
import PropTypes from "prop-types";

function ColorItem({ colorItem }) {
  return (
    <div className="color-item">
      <div className="color-item-left">
        <div
          className="color-box"
          style={{ backgroundColor: `#${colorItem.hex}` }}
        ></div>
        <div className="color-name">{colorItem.name}</div>
      </div>

      <div className="color-item-right">
        <div className="flex-start">
          <div className="color-format">HEX:</div>
          <div className="color-hex"> #{colorItem.hex}</div>
        </div>
        <div className="flex-start">
          <div className="color-format">rgb:</div>
          <div className="color-rgb">{colorItem.rgb}</div>
        </div>
        <button type="button"></button>
      </div>
    </div>
  );
}

ColorItem.propTypes = {
  colorItem: PropTypes.any,
};

export default ColorItem;
