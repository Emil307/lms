import React from "react";
import { Navbar as MNavbar, NavbarProps as MNavbarProps } from "@mantine/core";
import { FooterNavbar, SidebarMenu } from "./components";
import useStyles from "./NavbarUser.styles";
import { sidebarItems, sidebarPublicItems } from "./constants";

export interface NavbarUser extends Omit<MNavbarProps, "children"> {
    isPublic?: boolean;
}

const NavbarUser = ({ hidden, isPublic = false, ...props }: NavbarUser) => {
    const { classes } = useStyles();

    if (hidden) {
        return null;
    }

    const items = isPublic ? sidebarPublicItems : sidebarItems;

    return (
        <MNavbar className={classes.root} {...props}>
            <SidebarMenu items={items} />
            <FooterNavbar isPublic={isPublic} />
        </MNavbar>
    );
};

export default NavbarUser;
