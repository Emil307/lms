import { Box } from "@mantine/core";
import { AppShell } from "@mantine/core";
import React from "react";
import { FooterUser } from "@widgets/Footer";
import { HeaderPublicUser, HeaderUser } from "@widgets/Header";
import { useSession } from "@features/auth";
import useStyles from "./UserLayout.styles";

export default function UserLayout({ children }: React.PropsWithChildren) {
    const { classes } = useStyles();
    const { user } = useSession();

    const renderHeader = user?.id ? <HeaderUser /> : <HeaderPublicUser />;
    return (
        <AppShell padding={16} classNames={classes} layout="alt" header={renderHeader} footer={<FooterUser />}>
            <Box sx={{ marginInline: "auto", maxWidth: 1320, paddingTop: 32, paddingBottom: 96 }}>{children}</Box>
        </AppShell>
    );
}
