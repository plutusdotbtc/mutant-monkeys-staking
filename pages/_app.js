import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { useRouter } from 'next/router'
import {useEffect} from 'react'
import '../styles/styles.scss'
import {wrapper} from '../redux/store';
import { AppConfig, UserSession, showConnect } from '@stacks/connect'

const appConfig = new AppConfig(['publish_data']);
const userSession = new UserSession({ appConfig });
const stacksNet = 'mainnet';

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    // const handleStart = (url) => {
    //   console.log(`Loading: ${url}`)
    //   NProgress.start()
    // }
    const handleStop = () => {
      window.analytics.page();
    }
    // router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    // router.events.on('routeChangeError', handleStop)
    return () => {
      // router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      // router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return(
    <>
      <Head>
        <title>Bitcoin Monkey Staking</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap"></link>
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap"></link>

        <script>
        {`!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="YDpooCFKpY2NaKiYUCzDxQW5aZvYTrYA";;analytics.SNIPPET_VERSION="4.15.3";
        analytics.load("YDpooCFKpY2NaKiYUCzDxQW5aZvYTrYA");
        analytics.page();
        }}();`}
        </script>
      </Head>
      
      <ToastContainer />
      <Component {...pageProps} />
    </>
  ) 
}

export default wrapper.withRedux(MyApp);
