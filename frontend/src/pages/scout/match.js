import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import DynamicForm from '../../components/DynamicForm'
import QRCode from "react-qr-code"
import axios from 'axios'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from "uuid";

export default function MatchScoutingForm() {
  const [formSchema, setFormSchema] = useState([]);
  const [values, setValues] = useState({});
  const [submitStatus, setSubmitStatus] = useState();
  const [nextMatch, setNextMatch] = useState();
  const [loadedMatch, setLoadedMatch] = useState(false);

  const router = useRouter()

  useEffect(() => {
    const getFormSchema = async () => {
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

    const getNextMatch = async () => {
      axios.get('/api/tba/getNextMatch').then((res) => {
        var next_match = res.data.next_match
        setNextMatch(next_match)
        localStorage.setItem("next_match", next_match)
      }).catch((err) => {
        var next_match = localStorage.getItem("next_match")
        if (next_match) {
          setNextMatch(next_match)
        } else {
          console.log("No match key found")
        }
      })
    }

    getFormSchema()
    getNextMatch()
  }, [])

  useEffect(() => {
    if (formSchema.length > 0 && nextMatch !== undefined && !loadedMatch) {
      var formSchemaCopy = [...formSchema]
      formSchemaCopy = formSchemaCopy.map(field => field.id == "match_key" ? {...field, value: nextMatch} : field)
      setFormSchema(formSchemaCopy)
      setLoadedMatch(true)
    }
  }, [formSchema, nextMatch])

  const handleSubmit = async (val) => {
    var data = {id: uuidv4(), ...val}
    setValues(data)
  };

  useEffect(() => {
    if (Object.keys(values).length > 0) {
      axios.post('/api/scout/match', JSON.stringify(values)).then((res) => {
        setSubmitStatus(true)
        router.push("/")
      }).catch((err) => {
        setSubmitStatus(false)
        console.log("Unable to submit data")
        console.log(err)
      })
    }
  }, [values])

  const handleFormChange = (e) => {
    var valuesCopy = {}
    Object.assign(valuesCopy, values)
    valuesCopy[e.target.name] = e.target.value
  }

  return (
    <div className="">
      <h1>Scout a match</h1>

      { formSchema.length > 0 &&
        <DynamicForm
          fields={formSchema}
          cbSubmit={handleSubmit}
          onFormChange={handleFormChange}
        />
      }

      { submitStatus === false &&
        <>
          <p className="text-danger">
            Submit failed. Try again with an Internet connection or scan QR code with another device.
          </p>
          <QRCode value={JSON.stringify(values)} style={{ margin: 10 }} />
        </>
      }
    </div>
  )
}