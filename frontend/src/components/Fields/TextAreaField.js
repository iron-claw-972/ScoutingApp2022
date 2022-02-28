import PropTypes from "prop-types";

function TextAreaField(props) {
  return (
    <div>
      <label className="fw-bold">{props.label}</label>
      <textarea
        className="form-control"
        type="text"
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onBlur={props.handleBlur}
        onChange={props.onChange}
      />
      {props.error && props.touched[props.name] && (
        <div className="text-danger">{props.error}</div>
      )}
    </div>
  );
}

TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

TextAreaField.defaultProps = {
  label: "",
  name: "",
  placeholder: "",
  value: "",
  error: "",
  onChange: () => {},
};

export default TextAreaField;