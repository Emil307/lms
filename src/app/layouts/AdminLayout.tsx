import { Box } from "@mantine/core";
import { AppShell } from "@mantine/core";
import React from "react";
import Footer from "./AdminLayout/ui/Footer/Footer";
import Header from "./AdminLayout/ui/Header/Header";
import { useAdminLayoutStyles } from "./AdminLayoutStyles";
import Navbar from "./AdminLayout/ui/Navbar/Navbar";

export default function AdminLayout({ children }: React.PropsWithChildren) {
    const { classes } = useAdminLayoutStyles();
    return (
        <AppShell classNames={classes} layout="alt" navbar={<Navbar />} header={<Header />} footer={<Footer />}>
            <Box sx={(theme) => ({ background: "white", borderRadius: theme.fn.radius("1.5rem") })} px={32} py={32}>
                {children}
            </Box>
        </AppShell>
    );
}
