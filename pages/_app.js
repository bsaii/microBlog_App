import "../styles/globals.css";
import { AppProvider } from "../lib/context";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </Provider>
  );
}

export default MyApp;
