import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    // Returns an object like: { html, head, errorHtml, chunks, styles }
    return renderPage();
  }

  render () {
    return (
      <html>
        <Head>
          <title>Lanista Coach</title>
          <link href="https://fonts.googleapis.com/css?family=Abel" rel="stylesheet"/>
        </Head>
        <body>
          <Main style="height: 100%;" />
          <NextScript style="height: 100%;"/>
        </body>
      </html>
    )
  }
}
