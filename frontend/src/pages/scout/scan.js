import { useEffect, useState } from "react";
import { QrReader } from '@blackbox-vision/react-qr-reader';
import axios from 'axios'
import { Router, useRouter } from 'next/router'
import { Data, datas } from "../../utils/localstorage";

export default function ScanQRCode() {
  const [isScanned, setIsScanned] = useState(false)
  const [scoutingData, setScoutingData] = useState({})
  const [formErrors, setFormErrors] = useState()

  const router = useRouter()

  useEffect(() => {
    var qrReader = document.getElementById("video")
    if (isScanned) {
      qrReader.pause()
    } else {
      qrReader.play()
    }
  }, [isScanned])

  useEffect(() => {
    var data = Object.values(datas).find(obj => {
      return obj.isType(scoutingData)
    })
    if (data) {
      data.addData(scoutingData)
    }
  }, [scoutingData])

  const submitData = async () => {
    var [submitted, err] = await data.submitData(scoutingData)
    if (submitted) {
      router.push("/")
    } else {
      var error = err.response?.data || err.request || err.message
      setFormErrors(error)
    }
  }

  const editData = async () => {
    router.push({
      pathname: data.formPath,
      query: {id: scoutingData.id}
    })
  }

  return (
    <>
      <h1 className="text-center">Scan Scouting Data</h1>
      <div className="container">
        <div className="row">
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                setIsScanned(true)
                setScoutingData(JSON.parse(result?.text))
              }
            }}
            className="mx-auto col-lg-6"
            scanDelay="10"
          />

          { isScanned &&
            <div className="col-lg-6 m-auto text-center">
              <button
                className="btn btn-primary mx-2"
                onClick={() => {
                  setIsScanned(false)
                }}
              >
                Rescan
              </button>
              <button
                className="btn btn-warning mx-2"
                onClick={() => {
                  editData()
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-success mx-2"
                onClick={() => {
                  submitData()
                }}
              >
                Submit
              </button>
            </div>
          }

          <p className="text-danger">{JSON.stringify(formErrors)}</p>
        </div>
      </div>
    </>
  )
}