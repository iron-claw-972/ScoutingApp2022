import { useEffect, useState } from "react";
import axios from 'axios'
import { Router, useRouter } from 'next/router'
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.css";

export default function DisplayScoutingData() {
  const [scoutingData, setScoutingData] = useState([])
  const [scoutingDataKeys, setScoutingDataKeys] = useState([])

  const router = useRouter()

  useEffect(() => {
    axios.get('/api/scout/pit/getPitData/').then((res) => {
      setScoutingDataKeys(Object.keys(res.data[0]))
      var scouting_data = []
      for (var i = 0; i < res.data.length; i++) {
        scouting_data[i] = Object.values(res.data[i].filter())
      }
      setScoutingData(scouting_data)
    }).catch((err) => {
      console.log("No data")
    })
  }, [])

  return (
    <>
      <h1 className="text-center">View Pit Scouting Data</h1>
      <Grid
        data={scoutingData}
        columns={scoutingDataKeys}
        search={true}
        pagination={{
          enabled: false,
          limit: 4,
        }}
      />
    </>
  )
}