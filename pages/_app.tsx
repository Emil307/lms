import { ModalsProvider } from "@mantine/modals";
import { QueryProvider, ThemeProvider } from "src/app/providers";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <QueryProvider pageProps={pageProps}>
                <ModalsProvider>
                    <Component {...pageProps} />
                </ModalsProvider>
            </QueryProvider>
        </ThemeProvider>
    );
}

export default MyApp;
