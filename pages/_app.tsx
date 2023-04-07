import { ModalsProvider } from "@mantine/modals";
import { QueryProvider, ThemeProvider } from "@app/providers";
import { AppPropsWithLayout } from "@shared/utils";

import "@app/styles/index.scss";
import SessionProvider from "@app/providers/SessionProvider";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <ThemeProvider>
            <QueryProvider pageProps={pageProps}>
                <SessionProvider>
                    <ModalsProvider>{getLayout(<Component {...pageProps} />)}</ModalsProvider>
                </SessionProvider>
            </QueryProvider>
        </ThemeProvider>
    );
}

export default MyApp;
