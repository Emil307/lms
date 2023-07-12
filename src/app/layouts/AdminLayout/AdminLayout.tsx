import { Box } from "@mantine/core";
import { AppShell } from "@mantine/core";
import React from "react";
import { FooterAdmin } from "@widgets/Footer";
import { HeaderAdmin } from "@widgets/Header";
import { NavbarAdmin } from "@widgets/Navbar";
import { useAdminLayoutStyles } from "./AdminLayout.styles";

export default function AdminLayout({ children }: React.PropsWithChildren) {
    const { classes } = useAdminLayoutStyles();
    return (
        <AppShell padding={0} classNames={classes} layout="alt" navbar={<NavbarAdmin />} header={<HeaderAdmin />} footer={<FooterAdmin />}>
            <Box sx={(theme) => ({ backgroundColor: theme.colors.white[0], borderRadius: theme.fn.radius("1.5rem") })} px={32} py={32}>
                {children}
            </Box>
        </AppShell>
    );
}
