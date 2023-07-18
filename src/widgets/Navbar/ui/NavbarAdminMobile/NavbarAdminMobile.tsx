import React from "react";
import { Flex, Navbar as MNavbar, NavbarProps as MNavbarProps } from "@mantine/core";
import { FooterNavbar, SidebarMenu, UserInfoBlock } from "./components";
import useStyles from "./NavbarAdminMobile.styles";

export interface NavbarAdminMobile extends Omit<MNavbarProps, "children"> {}

const NavbarAdminMobile = ({ hidden, ...props }: NavbarAdminMobile) => {
    const { classes } = useStyles();

    if (hidden) {
        return null;
    }

    return (
        <MNavbar className={classes.root} {...props}>
            <Flex className={classes.inner}>
                <Flex direction="column" gap={32} mb={32}>
                    <UserInfoBlock />
                    <SidebarMenu />
                </Flex>
                <FooterNavbar />
            </Flex>
        </MNavbar>
    );
};

export default NavbarAdminMobile;
