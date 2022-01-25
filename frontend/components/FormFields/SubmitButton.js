import { useFormikContext } from "formik"

export default function SubmitButton(props){
    const { title, ...rest } = props;
    const { isSubmitting } = useFormikContext();
    
    return (
        <button type="submit" className="btn btn-primary" {...rest} disabled={isSubmitting}>{title}</button>
    )
}