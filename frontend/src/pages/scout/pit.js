import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import DynamicForm from '../../components/DynamicForm'
import QRCode from "react-qr-code"
import axios from 'axios'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from "uuid";
import { Data, datas } from '../../utils/localstorage'

export default function PitScoutingForm() {
  const [formSchema, setFormSchema] = useState([]);
  const [values, setValues] = useState({});
  const [submitStatus, setSubmitStatus] = useState();

  var currentEvent = "";
  var data = datas.pit

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

    const getCurrentEvent = async () => {
      axios.get('/api/scout/getCurrentEvent').then((res) => {
        var current_event = res.data.current_event
        currentEvent = current_event
        localStorage.setItem("current_event", current_event)
      }).catch((err) => {
        console.log("No event key found")
      })
      var current_event = localStorage.getItem("current_event")
      if (current_event) {
        currentEvent = current_event
      }
    }

    getCurrentEvent()
    getFormSchema()
  }, [])

  const processFormSchema = (oldFormSchema) => {
    var newFormSchema = [...oldFormSchema]
    newFormSchema = newFormSchema.map(field => field.id == "id" && !field.value ? {...field, value: uuidv4()} : field)
    if (Object.keys(routerQuery.current).length !== 0) {
      newFormSchema = data.addInitialValues(newFormSchema, routerQuery.current)
    } else if (currentEvent) {
      newFormSchema = newFormSchema.map(field => field.id == "event_key" ? {...field, value: currentEvent} : field)
    }
    return newFormSchema
  }

  useEffect(() => {
    if (Object.keys(router.query).length !== 0) {
      routerQuery.current = router.query
    }
    setFormSchema(processFormSchema(formSchema))
  }, [currentEvent, router.query])

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
      }
    }
  }, [values])

  const handleFormChange = (e) => {
    var valuesCopy = {}
    Object.assign(valuesCopy, values)
    valuesCopy[e.target.name] = e.target.value
  }

  return (
    <div className="">
      <h1 className="text-center">Pit scout</h1>

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
            Submit failed. Try again with an Internet connection or scan QR code with another device.
          </p>
          <QRCode value={JSON.stringify(data.appendType(values))} style={{ margin: 10 }} />
        </div>
      }
    </div>
  )
}