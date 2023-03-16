import React from "react";
import { Box, Navbar as MNavbar } from "@mantine/core";

import { Logo } from "@components/Logo";
import { Sidebar } from "./Sidebar";

const NavbarAdmin = () => {
    return (
        <MNavbar
            width={{ base: 280 }}
            pl={0}
            height="auto"
            p={16}
            sx={() => ({
                backgroundColor: "inherit",
                border: "none",
            })}>
            <Box pl={24}>
                <Logo />
            </Box>

            <Box mt={48}>
                <Sidebar />
            </Box>
        </MNavbar>
    );
};

export default NavbarAdmin;
