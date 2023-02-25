import React from "react";
import { MantineProvider } from "@mantine/core";
import { defaultTheme } from "./theme";

type Props = {};

export default function ThemeProvider({ children }: React.PropsWithChildren<Props>) {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS withCSSVariables theme={defaultTheme}>
            {children}
        </MantineProvider>
    );
}
