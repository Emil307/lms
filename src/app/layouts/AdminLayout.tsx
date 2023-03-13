import { Box } from "@mantine/core";
import { AppShell } from "@mantine/core";
import React from "react";
import FooterAdmin from "@widgets/FooterAmin/FooterAmin";
import HeaderAdmin from "@widgets/HeaderAdmin/HeaderAdmin";
import { useAdminLayoutStyles } from "./AdminLayoutStyles";
import Navbar from "../../widgets/NavbarAdmin/NavbarAdmin";

export default function AdminLayout({ children }: React.PropsWithChildren) {
    const { classes } = useAdminLayoutStyles();
    return (
        <AppShell
            padding={0}
            pr={24}
            classNames={classes}
            layout="alt"
            navbar={<Navbar />}
            header={<HeaderAdmin />}
            footer={<FooterAdmin />}>
            <Box sx={(theme) => ({ background: "white", borderRadius: theme.fn.radius("1.5rem") })} px={32} py={32}>
                {children}
            </Box>
        </AppShell>
    );
}
