import { Box } from "@mantine/core";
import { AppShell, Navbar, Header } from "@mantine/core";
import React from "react";
import { Sidebar } from "@widgets/Sidebar";
import { Logo } from "@components";

export default function AdminLayout({ children }: React.PropsWithChildren) {
    return (
        <AppShell
            padding="lg"
            navbar={
                <Navbar
                    width={{ base: 300 }}
                    pl={0}
                    height="auto"
                    p="lg"
                    sx={() => ({
                        backgroundColor: "inherit",
                        border: "none",
                    })}>
                    <Navbar.Section grow mt="md">
                        <Sidebar />
                    </Navbar.Section>
                    <Navbar.Section>{/* Footer with user */}</Navbar.Section>
                </Navbar>
            }
            header={
                <Header
                    height={104}
                    p="xs"
                    py="lg"
                    sx={() => ({
                        backgroundColor: "inherit",
                        border: "none",
                    })}>
                    <Logo />
                </Header>
            }>
            <Box sx={(theme) => ({ background: "white", borderRadius: theme.fn.radius("1.5rem") })} px={32} py={32}>
                {children}
            </Box>
        </AppShell>
    );
}
