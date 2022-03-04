import { useEffect, useState, useRef } from "react";
import axios from 'axios'
import { Router, useRouter } from 'next/router'
import 'handsontable/dist/handsontable.full.css';
import dynamic from "next/dynamic";
import { datas } from "../../utils/localstorage";
import Link from "next/link";
import { ObjectSchema } from "yup";

export default function DisplayScoutingData() {
  const [scoutingDataKeys, setScoutingDataKeys] = useState([])
  const [scoutingData, setScoutingData] = useState([])

  const router = useRouter()
  const hotTableComponent = useRef(null)

  const data = datas.match

  const DisplayTable = dynamic(() => import('../../components/DisplayTable').then((mod) => mod.default), { ssr: false, loading: () => <p>Loading...</p> })

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
    <div className="m-2 text-center">
      <h1 className="text-center">View Match Scouting Data</h1>
      { hotTableComponent !== null && scoutingData.length > 0 &&
        <button className="btn btn-primary" onClick={() => {
          import('xlsx').then(XLSX => {
            var sheet_data = [scoutingDataKeys, ...scoutingData.map(obj => Object.values(obj))]
            var worksheet = XLSX.utils.aoa_to_sheet(sheet_data)
            var new_workbook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS")
            console.log(new_workbook)
            XLSX.writeFile(new_workbook, "Match_Scouting_Data.xlsx")
          })
        }}>
          Export
        </button>
      }
      <DisplayTable
        data={scoutingData}
        dropdownMenu={true}
        licenseKey="non-commercial-and-evaluation"
        contextMenu={true}
        ref={hotTableComponent}
        multiColumnSorting={true}
        filters={true}
        fixedRowsTop={1}
        readOnly={true}
        rowHeaders={true}
        colHeaders={scoutingDataKeys}
        height="auto"
        width="auto"
        className="m-2"
      />
      <Link href="/">
        <button className="btn btn-outline-warning">
          Return to home
        </button>
      </Link>
    </div>
  )
}