import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import DynamicForm from '../../components/DynamicForm'
import QRCode from "react-qr-code"
import axios from 'axios'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from "uuid";
import { Data, datas } from '../../utils/localstorage'

export default function MatchScoutingForm() {
  const [formSchema, setFormSchema] = useState([]);
  const [values, setValues] = useState({});
  const [submitStatus, setSubmitStatus] = useState();
  const [submitError, setSubmitError] = useState("");

  var nextMatch = "";
  var data = datas.match

  const router = useRouter()
  const routerQuery = useRef(router.query)

  useEffect(() => {
    const getFormSchema = async () => {
      var [receivedFormSchema, form_schema] = await data.getFormSchema()
      if (receivedFormSchema) {
        setFormSchema(processFormSchema(form_schema))
      } else {
        console.log(form_schema)
      }
    }

    const getNextMatch = async () => {
      axios.get('/api/tba/getNextMatch').then((res) => {
        var next_match = res.data.next_match
        nextMatch = next_match
        localStorage.setItem("next_match", next_match)
      }).catch((err) => {
        console.log("No match key found")
      })
      var next_match = localStorage.getItem("next_match")
      if (next_match) {
        nextMatch = next_match
      }
    }

    getNextMatch()
    getFormSchema()
  }, [])

  const processFormSchema = (oldFormSchema) => {
    var newFormSchema = [...oldFormSchema]
    newFormSchema = newFormSchema.map(field => field.id == "id" && !field.value ? {...field, value: uuidv4()} : field)
    if (Object.keys(routerQuery.current).length !== 0) {
      newFormSchema = data.addInitialValues(newFormSchema, routerQuery.current)
    } else if (nextMatch) {
      newFormSchema = newFormSchema.map(field => field.id == "match_key" ? {...field, value: nextMatch} : field)
    }
    return newFormSchema
  }

  useEffect(() => {
    if (Object.keys(router.query).length !== 0) {
      routerQuery.current = router.query
    }
    setFormSchema(processFormSchema(formSchema))
  }, [nextMatch, router.query])

  const handleSubmit = async (val) => {
    var data = {...val}
    setValues(data)
  };

  useEffect(async () => {
    if (Object.keys(values).length > 0) {
      var [submitted, err] = await data.submitData(values)
      setSubmitStatus(submitted)
      if (submitted) {
        router.push("/")
      } else {
        console.log(err?.response?.data || err.request || err.message)
        setSubmitError("Submit failed. Try again with an Internet connection or scan QR code with another device.")
      }
    }
  }, [values])

  const handleFormChange = (e) => {
    var valuesCopy = {}
    Object.assign(valuesCopy, values)
    valuesCopy[e.target.name] = e.target.value
  }

  return (
    <div className="text-center">
      <div className="">
        <h1 className="text-center">Scout a match</h1>

        { formSchema.length > 0 &&
          <DynamicForm
            fields={formSchema}
            cbSubmit={handleSubmit}
            onFormChange={handleFormChange}
          />
        }

        { submitStatus === false &&
          <div className="text-center">
            <p className="text-danger">
              {submitError}
            </p>
            <QRCode value={JSON.stringify(data.appendType(values))} style={{ margin: 10 }} />
          </div>
        }
      </div>
      <Link href="/">
        <button className="btn btn-outline-warning">
          Return to home
        </button>
      </Link>
    </div>
  )
}