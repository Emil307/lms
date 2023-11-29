import { ModalsProvider, closeAllModals } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryParamProvider } from "use-query-params";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { QueryProvider, ThemeProvider } from "@app/providers";
import { AppPropsWithLayout } from "@shared/utils";
import { Adapter } from "@app/config/query";
import SessionProvider from "@app/providers/SessionProvider";
import "@app/styles/index.scss";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const router = useRouter()
    const getLayout = Component.getLayout ?? ((page) => page);

    useEffect(() => {
        closeAllModals()
    }, [router])

    return (
        <ThemeProvider>
            <QueryProvider pageProps={pageProps}>
                <QueryParamProvider adapter={Adapter}>
                    <SessionProvider>
                        <NotificationsProvider position="bottom-right" limit={2} zIndex={1000}>
                            <ModalsProvider>{getLayout(<Component {...pageProps} />)}</ModalsProvider>
                        </NotificationsProvider>
                    </SessionProvider>
                </QueryParamProvider>
            </QueryProvider>
        </ThemeProvider>
    );
}

export default MyApp;
