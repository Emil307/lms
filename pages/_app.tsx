import "../styles/globals.css";
import {MantineProvider} from "@mantine/core";
import {deafultTheme} from "src/config/mantine";
import type {AppProps} from "next/app";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <MantineProvider withGlobalStyles theme={deafultTheme}>
            <Component {...pageProps} />
        </MantineProvider>
    );
}

export default MyApp;
