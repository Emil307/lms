import { ModalsProvider } from "@mantine/modals";
import { QueryProvider, ThemeProvider } from "@app/providers";
import { AppPropsWithLayout } from "@shared/utils";
import "@app/styles/index.scss";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <ThemeProvider>
            <QueryProvider pageProps={pageProps}>
                <ModalsProvider>{getLayout(<Component {...pageProps} />)}</ModalsProvider>
            </QueryProvider>
        </ThemeProvider>
    );
}

export default MyApp;
