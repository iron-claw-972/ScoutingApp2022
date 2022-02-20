import PropTypes from "prop-types";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import Fields from "./Fields";
import { createYupSchema } from "../utils/yupSchemaCreator";
import { useEffect } from "react";

const Button = styled.button`
  padding: 4px;
  width: 190px;
`;

function DynamicForm(props) {
  const { fields, cbSubmit } = props;

  const initialValues = {};

  fields.forEach(item => {
    initialValues[item.id] = item.value || "";
  });

  const yupSchema = fields.reduce(createYupSchema, {});

  const validateSchema = yup.object().shape(yupSchema);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validateSchema,
    onSubmit: cbSubmit,
    enableReinitialize: true,
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Fields fields={fields} formikProps={formik} onFormChange={props.onFormChange} />
        <Button type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}

DynamicForm.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      placeholder: PropTypes.string,
      type: PropTypes.string.isRequired,
      validationType: PropTypes.string.isRequired,
      value: PropTypes.any,
      options: PropTypes.array,
      validations: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string.isRequired,
          params: PropTypes.array.isRequired
        })
      )
    })
  ).isRequired,
  cbSubmit: PropTypes.func.isRequired,
  onFormChange: PropTypes.func,
};

export default DynamicForm;