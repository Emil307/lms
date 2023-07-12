import React from "react";
import { Box, Navbar as MNavbar } from "@mantine/core";
import { Sidebar } from "./Sidebar";
import useStyles from "./NavbarAdmin.styles";

const NavbarAdmin = () => {
    const { classes } = useStyles();

    return (
        <MNavbar className={classes.root}>
            <Box className={classes.sidebarWrapper}>
                <Sidebar />
            </Box>
        </MNavbar>
    );
};

export default NavbarAdmin;
