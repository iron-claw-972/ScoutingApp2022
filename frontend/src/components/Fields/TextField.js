import PropTypes from "prop-types";

function TextField(props) {
  return (
    <>
      <div className="form-group">
        <label className="fw-bold">{props.label}</label>
        <input
          className="form-control"
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onBlur={props.handleBlur}
          onChange={props.onChange}
        />
        {props.error && props.touched[props.name] && (
          <div className="text-danger">{props.error}</div>
        )}
      </div>
    </>
  );
}

TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default TextField;