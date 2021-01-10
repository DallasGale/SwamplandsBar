import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;800&family=Bebas+Neue&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body id="top">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
