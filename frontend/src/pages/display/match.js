import { useEffect, useState } from "react";
import axios from 'axios'
import { Router, useRouter } from 'next/router'
import 'handsontable/dist/handsontable.full.css';
import dynamic from "next/dynamic";
import { datas } from "../../utils/localstorage";

export default function DisplayScoutingData() {
  const [scoutingDataKeys, setScoutingDataKeys] = useState([])
  const [scoutingData, setScoutingData] = useState([])

  const router = useRouter()

  const data = datas.match

  const DisplayTable = dynamic(() => import('../../components/DisplayTable').then((mod) => mod.default), {ssr: false, loading: () => <p>Loading...</p>})

  useEffect(() => {
    axios.get('/api/scout/match/getMatchData/').then(async (res) => {
      var scouting_data_keys = Object.keys(res.data[0])
      var [success, form_schema] = await data.getFormSchema()
      if (success) {
        scouting_data_keys = scouting_data_keys.map((key) => {
          return form_schema.find((field) => {
            return field.id === key
          })?.label
        })
      }
      setScoutingDataKeys(scouting_data_keys)
      var scouting_data = []
      for (var i = 0; i < res.data.length; i++) {
        scouting_data[i] = Object.values(res.data[i])
      }
      setScoutingData(scouting_data)
    }).catch((err) => {
      console.log("No data")
    })
  }, [])

  return (
    <>
      <h1 className="text-center">View Match Scouting Data</h1>
      <DisplayTable
        data={scoutingData}
        dropdownMenu={true}
        licenseKey="non-commercial-and-evaluation"
        contextMenu={true}
        multiColumnSorting={true}
        filters={true}
        fixedRowsTop={1}
        rowHeaders={true}
        colHeaders={scoutingDataKeys}
        height="auto"
        width="auto"
      />
    </>
  )
}