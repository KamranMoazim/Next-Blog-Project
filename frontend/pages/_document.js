import Document, {Html, Head, Main, NextScript} from "next/document";
import React from 'react';


class MyDocument extends Document {


  render(){
    return (
        <Html lang="en">
            <Head>
                <meta charSet="UTF-8"/>
                {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
                {/* viewport should be set in _app.js file */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.1/css/bootstrap.min.css" integrity="sha512-T584yQ/tdRR5QwOpfvDfVQUidzfgc2339Lc8uBDtcp/wYu80d7jwBgAxbyMh0a9YM9F8N3tdErpFI8iaGx6x5g==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                <link rel="stylesheet" href="/styles.css" /> {/* as it is directly in public folder */}
                
            </Head>
            <body>
                <Main>
                </Main>
                <NextScript />
            </body>
        </Html>
    )
  }
}

export default MyDocument;
