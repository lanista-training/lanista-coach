import Document, { Head, Main, NextScript } from 'next/document';
import DeviceDetector from "device-detector-js";

export default class MyDocument extends Document {

  static async getInitialProps (ctx) {
    const { renderPage, req, res, pathname } = ctx;
    let userAgent;
    if (req) { // if you are on the server and you get a 'req' property from your context
      userAgent = req.headers['user-agent'] // get the user-agent from the headers
    } else {
      userAgent = navigator.userAgent // if you are on the client you can access the navigator from the window object
    }
    const deviceDetector = new DeviceDetector();
    const device = deviceDetector.parse(userAgent);
    const deviceNotCompatible = device && device.device && device.device.type == 'smartphone';
    //
    console.log("deviceNotCompatible", deviceNotCompatible, pathname.indexOf('deviceerror'))
    if( deviceNotCompatible && pathname.indexOf('deviceerror') == -1 ) {
      res.writeHead(301, {Location: '/deviceerror'});
      res.end();
      return {};
    }
    return renderPage();
  }

  render () {
    const {deviceNotCompatible} = this.props;
    return (
      <html>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,900&display=swap" rel="stylesheet"/>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"/>
          <link rel="stylesheet" href="https://lanistacoach.s3.amazonaws.com/static/css/mfb.css"/>
          <link rel="stylesheet" href="https://lanistacoach.s3.amazonaws.com/static/css/glogal-style.css"/>
          <link rel="stylesheet" href="https://lanistacoach.s3.amazonaws.com/static/css/workout-style.css"/>
          <link rel="stylesheet" href="https://lanistacoach.s3.amazonaws.com/static/css/react-day-picker-style.css"/>
        </Head>
        <body>
          {deviceNotCompatible && (
            <div>Device not supported</div>
          )}
          {!deviceNotCompatible && (
            <>
              <Main style="height: 100%;" />
              <NextScript style="height: 100%;"/>
            </>
          )}

        </body>
      </html>
    )
  }
}
