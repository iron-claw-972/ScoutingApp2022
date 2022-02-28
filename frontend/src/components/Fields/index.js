import PropTypes from "prop-types";
import TextField from "./TextField";
import HiddenField from "./HiddenField";
import NumberField from "./NumberField";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";
import RadioButtonField from "./RadioButtonField";
import CheckboxField from "./CheckboxField";
import UploadField from "./UploadField";

const fieldMap = {
  text: TextField,
  hidden: HiddenField,
  number: NumberField,
  select: SelectField,
  textarea: TextAreaField,
  radio: RadioButtonField,
  checkbox: CheckboxField,
  upload: UploadField,
};

function Fields(props) {
  const { fields, formikProps } = props

  const {
    errors,
    touched,
    values,
    handleBlur,
    handleChange,
    setFieldValue,
  } = formikProps;

  const onChange = (e) => {
    props.onFormChange(e)
    handleChange(e)
  }

  return fields.map((item, index) => {
    const Component = fieldMap[item.type];
    let error = errors.hasOwnProperty(item.id) && errors[item.id];
    if (!item.type) {
      return null;
    }
    return (
      <Component
        key={index}
        label={item.label}
        type={item.type}
        name={item.id}
        placeholder={item.placeholder}
        value={values[item.id]}
        options={item.options}
        touched={touched}
        error={error}
        handleBlur={handleBlur}
        onChange={onChange}
        setFieldValue={setFieldValue}
      />
    );
  });
}

Fields.propTypes = {
  fields: PropTypes.array.isRequired,
  formikProps: PropTypes.object.isRequired,
};

export default Fields;