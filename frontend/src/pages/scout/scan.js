import { useEffect, useState } from "react";
import { QrReader } from '@blackbox-vision/react-qr-reader';
import axios from 'axios'
import { Router, useRouter } from 'next/router'

export default function ScanQRCode() {
  const [isScanned, setIsScanned] = useState(false)
  const [scoutingData, setScoutingData] = useState({})

  const router = useRouter()

  useEffect(() => {
    var qrReader = document.getElementById("video")
    if (isScanned) {
      qrReader.pause()
    } else {
      qrReader.play()
    }
  }, [isScanned])

  const submitData = async () => {
    axios.post('/api/scout/match', scoutingData).then((res) => {
      router.push("/")
    }).catch((err) => {
      console.log("Unable to submit data")
      console.log(err)
    })
  }

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            setIsScanned(true)
            setScoutingData(result?.text)
          }
        }}
        className="col-6"
      />

      { isScanned &&
        <>
          <button
            className="btn btn-primary"
            onClick={() => {
              setIsScanned(false)
            }}
          >
            Rescan
          </button>
          <button
            className="btn btn-success"
            onClick={() => {
              submitData()
            }}
          >
            Submit
          </button>
        </>
      }
    </>
  )
}