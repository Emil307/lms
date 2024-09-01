import React from "react";
import { Navbar as MNavbar, NavbarProps as MNavbarProps } from "@mantine/core";
import { FooterNavbar, SidebarMenu } from "./components";
import useStyles from "./NavbarUser.styles";
export interface NavbarUser extends Omit<MNavbarProps, "children"> {}

const NavbarUser = ({ hidden, ...props }: NavbarUser) => {
    const { classes } = useStyles();

    if (hidden) {
        return null;
    }

    return (
        <MNavbar className={classes.root} {...props}>
            <SidebarMenu />
            <FooterNavbar />
        </MNavbar>
    );
};

export default NavbarUser;
