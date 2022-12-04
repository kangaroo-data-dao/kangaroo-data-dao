import "../styles/globals.css";
import type { AppProps } from "next/app";
import GlobalProvider from "../state/contexts/GlobalContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;
