import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryProvider, ThemeProvider } from "@app/providers";
import { AppPropsWithLayout } from "@shared/utils";
import SessionProvider from "@app/providers/SessionProvider";
import "@app/styles/index.scss";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <ThemeProvider>
            <QueryProvider pageProps={pageProps}>
                <SessionProvider>
                    <NotificationsProvider position="bottom-right" limit={2} zIndex={1000}>
                        <ModalsProvider>{getLayout(<Component {...pageProps} />)}</ModalsProvider>
                    </NotificationsProvider>
                </SessionProvider>
            </QueryProvider>
        </ThemeProvider>
    );
}

export default MyApp;
