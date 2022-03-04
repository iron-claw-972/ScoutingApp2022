import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

import '../styles/globals.css'

function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default App
