import PropTypes from "prop-types";

function RadioButtonField(props) {
  return (
    <div className="form-check-inline">
      <label className="fw-bold">{props.label}</label>
      <br />
      {props.options.map((opt, index) => {
        return (
          <label key={index} className="form-check-label mx-1">
            <input
              className="form-check-input"
              type="radio"
              name={props.name}
              value={opt}
              checked={opt === props.value}
              onBlur={props.handleBlur}
              onChange={props.onChange}
            />
            &nbsp;{opt}
          </label>
        );
      })}
      {props.error && props.touched[props.name] && (
        <div className="text-danger">{props.error}</div>
      )}
    </div>
  );
}

RadioButtonField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  options: PropTypes.array,
  error: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default RadioButtonField;