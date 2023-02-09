import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { deafultTheme } from "src/config/mantine";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles theme={deafultTheme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
