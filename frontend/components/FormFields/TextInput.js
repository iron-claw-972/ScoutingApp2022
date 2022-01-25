import { Field, ErrorMessage } from "formik"

export default function TextInput(props) {
    const { name, label, placeholder, defaultValue, onChange, ...rest } = props

    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <Field
                className="form-control col-4"
                type="text"
                name="text"
                id={name}
                defaultValue={defaultValue || ""}
                onChange={onChange}
                placeholder={placeholder || ""}
                {...rest}
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </>
    )
}