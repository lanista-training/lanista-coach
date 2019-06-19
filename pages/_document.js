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
          <link href="https://fonts.googleapis.com/css?family=Abel" rel="stylesheet"/>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"/>
          <link rel="stylesheet" href="https://lanistacoach.s3.amazonaws.com/static/css/mfb.css"/>
          <link rel="stylesheet" href="https://lanistacoach.s3.amazonaws.com/static/css/glogal-style.css"/>
          <link rel="stylesheet" href="https://lanistacoach.s3.amazonaws.com/static/css/style.css"/>
          <link rel="stylesheet" href="https://lanistacoach.s3.amazonaws.com/static/css/react-day-picker-style.css"/>
        </Head>
        <body>
          <Main style="height: 100%;" />
          <NextScript style="height: 100%;"/>
        </body>
      </html>
    )
  }
}
