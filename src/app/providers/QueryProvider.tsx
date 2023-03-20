import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: 60000,
            cacheTime: 600000,
        },
    },
});

function QueryProvider({ children, pageProps }: PropsWithChildren<AppProps["pageProps"]>) {
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>{children}</Hydrate>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default QueryProvider;
