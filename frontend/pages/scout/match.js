import Link from 'next/link'
import { useEffect, useState } from 'react'
import DynamicForm from '../../components/DynamicForm'
import QRCode from "react-qr-code"
import axios from 'axios'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from "uuid";

export default function MatchScoutingForm() {
  const [formSchema, setFormSchema] = useState([]);
  const [values, setValues] = useState({});

  const router = useRouter()

  const getFormSchema = () => {
    axios.get('/api/scout/match/getFormSchema').then((res) => {
      setFormSchema(res.data)
      localStorage.setItem("match_form_schema", JSON.stringify(res.data))
    }).catch((err) => {
      var match_form_schema_str = localStorage.getItem("match_form_schema")
      if (match_form_schema_str) {
        setFormSchema(JSON.parse(match_form_schema_str))
      } else {
        console.log("No form schema found")
      }
    })
  }

  useEffect(() => {
    getFormSchema()
  }, [])

  const handleSubmit = (val) => {
    setValues({id: uuidv4(), ...val})
    axios.post('/api/scout/match', JSON.stringify(values)).then((res) => {
      router.push("/")
    }).catch((err) => {
      console.log("Unable to submit data")
      console.log(err)
    })
  };

  const handleFormChange = (e) => {
    var valuesCopy = {}
    Object.assign(valuesCopy, values)
    valuesCopy[e.target.name] = e.target.value
  }

  return (
    <div className="">
      <h1>Scout a match</h1>

      <DynamicForm
        fields={formSchema}
        cbSubmit={handleSubmit}
        onFormChange={handleFormChange}
      />

      <QRCode value={JSON.stringify(values)} style={{ margin: 10 }} />
    </div>
  )
}