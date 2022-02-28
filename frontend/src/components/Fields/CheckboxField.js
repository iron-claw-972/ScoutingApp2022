import React, { useState } from "react";
import PropTypes from "prop-types";

function CheckboxField(props) {
  const [checkedItems, setCheckedItems] = useState(new Map());

  const handleCheckItem = (e) => {
    const { name, value } = e.target;
    let items = new Map(checkedItems);
    if (checkedItems.has(name)) {
      items.delete(name);
    } else {
      items.set(name, value);
    }
    setCheckedItems(items);
    props.setFieldValue(props.name, Array.from(items.values()).toString());
  };

  return (
    <div>
      <label className="fw-bold">{props.label}</label>
      {props.options.map((opt, index) => {
        return (
          <label key={index}>
            <input
              type="checkbox"
              name={props.name + "-" + index}
              value={opt}
              checked={checkedItems.get(props.name + "-" + index)}
              onBlur={props.handleBlur}
              onChange={handleCheckItem}
            />
            {opt}
          </label>
        );
      })}
      {props.error && props.touched[props.name] && (
        <div className="text-danger">{props.error}</div>
      )}
    </div>
  );
}

CheckboxField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  error: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default CheckboxField;