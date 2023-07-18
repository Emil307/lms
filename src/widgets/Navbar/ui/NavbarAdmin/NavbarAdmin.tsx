import React from "react";
import { Box, Navbar as MNavbar, NavbarProps as MNavbarProps } from "@mantine/core";
import { Sidebar } from "./Sidebar";
import useStyles from "./NavbarAdmin.styles";

export interface NavbarAdminProps extends Omit<MNavbarProps, "children"> {}

const NavbarAdmin = (props: NavbarAdminProps) => {
    const { classes } = useStyles();

    return (
        <MNavbar className={classes.root} {...props}>
            <Box className={classes.inner}>
                <Sidebar />
            </Box>
        </MNavbar>
    );
};

export default NavbarAdmin;
