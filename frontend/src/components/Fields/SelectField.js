import PropTypes from "prop-types";

function SelectField(props) {
  return (
    <div>
      <label className="fw-bold">{props.label}</label>
      <select
        name={props.name}
        defaultValue={props.value}
        onBlur={props.handleBlur}
        onChange={props.onChange}
      >
        <option value={""}>Please Select</option>
        {props.options.map((opt, index) => {
          return (
            <option key={index} value={opt}>
              {opt}
            </option>
          );
        })}
      </select>
      {props.error && props.touched[props.name] && (
        <div className="text-danger">{props.error}</div>
      )}
    </div>
  );
}

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  options: PropTypes.array,
  error: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

SelectField.defaultValue = {
  options: [],
};

export default SelectField;