import PropTypes from "prop-types";

function NumberSpinnerField(props) {
  return (
    <div>
      <label className="fw-bold">{props.label}</label>
      <div className="input-group">
        <button
          type="button"
          className="rounded-start btn-outline"
          style={{
            border: "1px solid #ced4da",
            borderRight: "none"
          }}
          onClick={() => {
            props.setFieldTouched(props.name)
            props.setFieldValue(props.name, (parseInt(props.value) ? parseInt(props.value) : 0) - 1)
          }}
        >
          <span className="fw-bold">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
        </button>
        <input
          className="form-control rounded-0 border-start-0 border-end-0"
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onBlur={props.handleBlur}
          onChange={props.onChange}
        />
        <button
          type="button"
          className="rounded-end btn-outline"
          style={{
            border: "1px solid #ced4da",
            borderLeft: "none"
          }}
          onClick={() => {
            props.setFieldTouched(props.name)
            props.setFieldValue(props.name, (parseInt(props.value) ? parseInt(props.value) : 0) + 1)
          }}
        >
          <span className="fw-bold">&nbsp;&nbsp;+&nbsp;&nbsp;</span>
        </button>
      </div>
      {props.error && props.touched[props.name] && (
        <div className="text-danger">{props.error}</div>
      )}
    </div>
  );
}

NumberSpinnerField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default NumberSpinnerField;