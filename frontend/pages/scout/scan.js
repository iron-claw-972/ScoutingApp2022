import { useState } from "react";
import { QrReader } from '@blackbox-vision/react-qr-reader';

export default function ScanQRCode() {
  const [data, setData] = useState("No data")

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        className="col-4"
      />
      <p>{data}</p>
    </>
  )
}