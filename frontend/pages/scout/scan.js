import { useState } from "react";
import { QrReader } from '@blackbox-vision/react-qr-reader';
import axios from 'axios'

export default function ScanQRCode() {
  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            console.log(result?.text)
          } else {
            console.info(error);
          }
        }}
        className="col-4"
      />
    </>
  )
}