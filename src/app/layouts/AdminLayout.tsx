import { Box } from "@mantine/core";
import { AppShell, Navbar } from "@mantine/core";
import React from "react";
import Logo from "@components/Logo";
import { Sidebar } from "@widgets/Sidebar";
import Footer from "./AdminLayout/ui/Footer/Footer";
import Header from "./AdminLayout/ui/Header/Header";

export default function AdminLayout({ children }: React.PropsWithChildren) {
    return (
        <AppShell
            layout="alt"
            padding="lg"
            navbar={
                <Navbar
                    width={{ base: 300 }}
                    pl={0}
                    height="auto"
                    p={16}
                    sx={() => ({
                        backgroundColor: "inherit",
                        border: "none",
                    })}>
                    <Navbar.Section>
                        <Box pl={24}>
                            <Logo />
                        </Box>

                        <Box mt={32}>
                            <Sidebar />
                        </Box>
                    </Navbar.Section>
                    <Navbar.Section>{/* Footer with user */}</Navbar.Section>
                </Navbar>
            }
            header={
                // <Header
                //     height={104}
                //     p="xs"
                //     py="lg"
                //     sx={() => ({
                //         backgroundColor: "inherit",
                //         border: "none",
                //     })}>qwew</Header>
                <Header />
            }
            footer={<Footer />}>
            <Box sx={(theme) => ({ background: "white", borderRadius: theme.fn.radius("1.5rem") })} px={32} py={32}>
                {children}
            </Box>
        </AppShell>
    );
}
