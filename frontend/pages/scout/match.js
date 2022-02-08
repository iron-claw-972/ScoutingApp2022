import Link from "next/link";
import * as Yup from "yup";
import Form from "../../components/Form";
import TextInput from "../../components/FormFields/TextInput";
import NumberInput from "../../components/FormFields/NumberInput";
import SubmitButton from "../../components/FormFields/SubmitButton";
import SelectInput from "../../components/FormFields/SelectInput";
import { useState, useEffect } from "react";

const formSchema = {
  event_key: {
    type: "text",
    label: "Event Key",
    required: true,
  },
  match_key: {
    type: "text",
    label: "Match Key",
    required: true,
  },
  scouter_name: {
    type: "text",
    label: "Scouter Name",
    required: true,
  },
  team_name: {
    type: "text",
    label: "Team Name",
    required: false,
  },
  team_number: {
    type: "number",
    label: "Team Number",
    min: 1,
    max: 9999,
    defaultValue: 1,
    required: true,
  },
  alliance_color: {
    type: "select",
    label: "Alliance Color",
    required: true,
    options: ["Red", "Blue"],
  },
};

export default function MatchScoutingForm() {
  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});

  useEffect(() => {
    initForm(formSchema);
  }, []);

  const initForm = (formSchema) => {
    let _formData = {};
    let _validationSchema = {};

    for (var key of Object.keys(formSchema)) {
      _formData[key] = formSchema[key].defaultValue || "";

      switch (formSchema[key].type) {
        case "text":
          _validationSchema[key] = Yup.string();
          break;
        case "number":
          _validationSchema[key] = Yup.number().positive();
          break;
        case "select":
          _validationSchema[key] = Yup.string();
          break;
      }

      if (formSchema[key].required) {
        _validationSchema[key] = _validationSchema[key].required("Required");
      }
    }

    setFormData(_formData);
    setValidationSchema(Yup.object().shape({ ..._validationSchema }));
  };

  const getFormElement = (elementName, elementSchema) => {
    const props = {
      name: elementName,
      ...elementSchema,
      required: false,
    };

    switch (elementSchema.type) {
      case "text":
        return <TextInput {...props} />;
      case "number":
        return <NumberInput {...props} />;
      case "select":
        return <SelectInput {...props} />;
    }
  };

  const handleSubmit = async (values) => {
    const res = await fetch("/api/scout/match", {
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    console.log(values);

    const statusCode = res.status;
    if (statusCode > 200 && statusCode < 299) {
      console.log("Success!");
    }
  };

  return (
    <>
      <h1>Scout a match</h1>

      <Form
        enableReinitialize
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {Object.keys(formSchema).map((key, ind) => (
          <div key={key}>{getFormElement(key, formSchema[key])}</div>
        ))}

        <SubmitButton title="Submit" />
      </Form>

      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
