import { ModalsProvider, closeAllModals } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryParamProvider } from "use-query-params";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryProvider, ThemeProvider } from "@app/providers";
import { AppPropsWithLayout } from "@shared/utils";
import { Adapter } from "@app/config/query";
import SessionProvider from "@app/providers/SessionProvider";
import "@app/styles/index.scss";
import AuthDrawer from "../src/widgets/Drawer/ui/AuthDrawer";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const router = useRouter();
    const getLayout = Component.getLayout ?? ((page) => page);

    useEffect(() => {
        closeAllModals();
    }, [router]);

    function handleBoom() {
        throw new Error("Boom");
    }

    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <ThemeProvider>
                <QueryProvider pageProps={pageProps}>
                    <QueryParamProvider adapter={Adapter}>
                        <SessionProvider>
                            <NotificationsProvider position="bottom-right" limit={2} zIndex={1000}>
                                <ModalsProvider>
                                    {getLayout(
                                        <>
                                            <Component {...pageProps} />
                                            <button
                                                onClick={handleBoom}
                                                style={{ position: "absolute", top: 0, left: 0, border: "1px solid red" }}>
                                                click b omb
                                            </button>
                                        </>
                                    )}
                                    <AuthDrawer />
                                </ModalsProvider>
                            </NotificationsProvider>
                        </SessionProvider>
                    </QueryParamProvider>
                </QueryProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}

export default MyApp;
