// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app';
import withChiakiUi from '@vjcspy/web-chiaki';
import withUi from '@vjcspy/web-ui';

function Web({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

// @ts-ignore
export default withChiakiUi(withUi(Web));
