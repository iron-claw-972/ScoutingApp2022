import { Field, ErrorMessage } from "formik"

export default function NumberInput(props) {
    const { name, label, placeholder, defaultValue, onChange, ...rest } = props

    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <Field
                className="form-control col-4"
                type="number"
                name="number"
                id={name}
                defaultValue={defaultValue || 0}
                onChange={onChange}
                placeholder={placeholder || ""}
                {...rest}
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </>
    )
}