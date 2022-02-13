import Link from 'next/link'
import { useEffect, useState } from 'react'
import DynamicForm from '../../components/DynamicForm'
import QRCode from "react-qr-code"
import axios from 'axios'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from "uuid";

const formData = [ 
  {
    id: "match_key",
    label: "Match Key",
    type: "text",
    validationType: "string",
    validations: [
      {
        type: "required",
        params: ["Match key is required"],
      },
    ],
  },
  {
    id: "event_key",
    label: "Event Key",
    type: "text",
    validationType: "string",
    validations: [
      {
        type: "required",
        params: ["Event key is required"],
      },
    ],
  },
  {
    id: "scouter_name",
    label: "Scouter Name",
    type: "text",
    validationType: "string",
    validations: [
      {
        type: "required",
        params: ["Scouter name is required"],
      },
    ],
  },
  {
    id: "team_number",
    label: "Team Number",
    type: "number",
    validationType: "number",
    validations: [
      {
        type: "required",
        params: ["Team number is required"],
      },
      {
        type: "integer",
        params: ["Team number must be an integer"],
      },
      {
        type: "min",
        params: [1, "Team number must be >= 1"],
      },
      {
        type: "max",
        params: [9999, "Team number cannot exceed 9999"],
      },
    ],
  },
  {
    id: "driver_station",
    label: "Driver Station",
    type: "radio",
    validationType: "string",
    options: ["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"],
    validations: [
      {
        type: "required",
        params: ["Driver station position is required"],
      },
    ],
  },
]

export default function MatchScoutingForm() {
  const [formSchema, setFormSchema] = useState(formData);
  const [values, setValues] = useState({});

  const router = useRouter()

  const getFormSchema = () => {
    axios.get('/api/scout/match/getFormSchema', JSON.stringify(values)).then((res) => {
      // console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getFormSchema()
  })

  const handleSubmit = (val) => {
    setValues({id: uuidv4(), ...val})
  };

  useEffect(() => {
    console.log(values)
    axios.post('/api/scout/match', JSON.stringify(values)).then((res) => {
      // router.push("/")
    }).catch((err) => {
      console.log(err)
    })
  }, [values])

  const handleFormChange = (e) => {
    var valuesCopy = {}
    Object.assign(valuesCopy, values)
    valuesCopy[e.target.name] = e.target.value
  }

  return (
    <>
      <h1>Scout a match</h1>

      <DynamicForm
        fields={formSchema}
        cbSubmit={handleSubmit}
        onFormChange={handleFormChange}
      />

      <QRCode value={JSON.stringify(values)} size={100} style={{ margin: 10 }} />

      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  )
}