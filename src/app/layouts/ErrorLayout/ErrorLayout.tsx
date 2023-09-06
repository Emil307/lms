import { AppShell } from "@mantine/core";
import React from "react";
import useStyles from "./ErrorLayout.styles";
import { Logo } from "@components/Logo";
import { FooterError } from "@widgets/Footer";

export default function ErrorLayout({ children }: React.PropsWithChildren) {
    const { classes } = useStyles();

    return (
        <AppShell className={classes.root} footer={<FooterError />}>
            <Logo />
            {children}
        </AppShell>
    );
}
