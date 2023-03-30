import { Box } from "@mantine/core";
import { AppShell } from "@mantine/core";
import React from "react";
import { FooterUser } from "@widgets/Footer";
import { HeaderUser } from "@widgets/Header";

import useStyles from "./UserLayout.styles";

export default function UserLayout({ children }: React.PropsWithChildren) {
    const { classes } = useStyles();
    return (
        <AppShell padding={16} classNames={classes} layout="alt" header={<HeaderUser />} footer={<FooterUser />}>
            <Box sx={{ marginInline: "auto", maxWidth: 1320, paddingTop: 32, paddingBottom: 96 }}>{children}</Box>
        </AppShell>
    );
}
