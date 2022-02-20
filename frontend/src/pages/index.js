import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Scouting App</title>
        <meta name="description" content="Scouting App for FRC 2022 Water Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Scouting App 2022</h1>

        <div className={styles.grid}>
          <Link href="/scout/match">
            <a className={styles.card}>
              <h2>Match Scout</h2>
              <p>Collect data on a robot during a match</p>
            </a>
          </Link>

          <Link href="/scout/scan">
            <a className={styles.card}>
              <h2>Scan Scouting Data</h2>
              <p>Get to it, you lazy bastard</p>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <span className={styles.logo}>
          <Image src="/favicon.ico" alt="Scouting app icon" width={30} height={30} />
        </span>
        2022 Water Game confirmed
      </footer>
    </div>
  )
}
