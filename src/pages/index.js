import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useNotificationContext } from '@/contexts/notificationContext'

const inter = Inter({ subsets: ['latin'] })
const Home = () => {
  const {
    notificationToken, tokenLoading
  } = useNotificationContext()

  return (
    <>
      <Head>
        <title>Reni Notification</title>
        <meta name="description" content="Reni notification" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <span>Client Token:</span>
            <code className={styles.code} style={{overflowWrap: 'break-word'}}>
              {
                tokenLoading ? 'Loading...': notificationToken
              }
            </code>
          </p>
        </div>
      </main>
    </>
  )
}


export default Home