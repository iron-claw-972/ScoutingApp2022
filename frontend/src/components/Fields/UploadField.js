import PropTypes from "prop-types";

function UploadField(props) {
  return (
    <div>
      <label className="font-weight-bold">{props.label}</label>
      <input
        className="form-control-file"
        type="file"
        name={props.name}
        value={props.value}
        onBlur={props.handleBlur}
        onChange={props.onChange}
      />
      {props.error && props.touched[props.name] && (
        <div className="text-danger">{props.error}</div>
      )}
    </div>
  );
}

UploadField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  error: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

UploadField.defaultValue = {};

export default UploadField;