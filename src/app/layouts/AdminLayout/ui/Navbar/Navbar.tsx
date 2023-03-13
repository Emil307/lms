import React from "react";
import { Box, Navbar as MNavbar } from "@mantine/core";
import { Sidebar } from "@widgets/Sidebar";
import { Logo } from "src/components/Logo";


const Navbar = () => {
    return (
        <MNavbar
            width={{ base: 300 }}
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

            <Box mt={32}>
                <Sidebar />
            </Box>
        </MNavbar>
    );
};

export default Navbar;
