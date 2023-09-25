import React from "react";
import { Navbar as MNavbar, NavbarProps as MNavbarProps } from "@mantine/core";
import { useSession } from "@entities/auth";
import { FooterNavbar, SidebarMenu } from "./components";
import useStyles from "./NavbarUser.styles";
import { getSidebarItems, getSidebarPublicItems } from "./utils";

export interface NavbarUser extends Omit<MNavbarProps, "children"> {
    isPublic?: boolean;
}

const NavbarUser = ({ hidden, isPublic = false, ...props }: NavbarUser) => {
    const { classes } = useStyles();
    const { user } = useSession();

    if (hidden) {
        return null;
    }

    const items = isPublic ? getSidebarPublicItems(!!user) : getSidebarItems(!!user);

    return (
        <MNavbar className={classes.root} {...props}>
            <SidebarMenu items={items} />
            <FooterNavbar isUserAuth={!!user} />
        </MNavbar>
    );
};

export default NavbarUser;
