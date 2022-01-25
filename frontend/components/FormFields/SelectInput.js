import { Field, ErrorMessage } from "formik"

export default function SelectInput(props) {
    const { name, label, options, defaultValue, onChange, ...rest } = props
    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <Field
                className="form-control col-4"
                as="select"
                name="select"
                id={name}
                defaultValue={defaultValue || ""}
                onChange={onChange}
                {...rest}
            >
                <option hidden disabled value=""> -- Select an option -- </option>
                {options.map(option =>
                    <option key={option} value={option}>{option}</option>
                )}
            </Field>
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </>
    )
}