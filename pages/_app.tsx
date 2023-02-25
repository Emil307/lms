import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { defaultTheme } from "src/config/mantine";
import { QueryProvider } from "src/app/providers";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider withGlobalStyles theme={defaultTheme}>
            <QueryProvider pageProps={pageProps}>
                <Component {...pageProps} />
            </QueryProvider>
        </MantineProvider>
    );
}

export default MyApp;
