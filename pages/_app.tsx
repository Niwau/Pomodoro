import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GlobalStyle/>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', 'sans-serif';
  
    body {
      background-color: #F35858;
    }

    html {
      font-size: 10px;
    }

  }
`
export default MyApp