import React, { useMemo, useState } from "react";
import { Box, Navbar as MNavbar, NavbarProps as MNavbarProps } from "@mantine/core";
import { Sidebar } from "./Sidebar";
import useStyles from "./NavbarAdmin.styles";
import { SidebarMinimizedModeContext } from "./utils";

export interface NavbarAdminProps extends Omit<MNavbarProps, "children"> {
    maxHeight?: number;
}

const NavbarAdmin = ({ maxHeight = 0, ...props }: NavbarAdminProps) => {
    const [isMinimizedModeSidebar, setIsMinimizedModeSidebar] = useState(false);
    const { classes } = useStyles({ isMinimizedModeSidebar, maxHeight });

    const contextValue = useMemo(
        () => ({
            isMinimizedModeSidebar,
            setIsMinimizedModeSidebar,
        }),
        [isMinimizedModeSidebar, setIsMinimizedModeSidebar]
    );

    return (
        <SidebarMinimizedModeContext.Provider value={contextValue}>
            <MNavbar className={classes.root} {...props}>
                <Box className={classes.inner}>
                    <Sidebar />
                </Box>
            </MNavbar>
        </SidebarMinimizedModeContext.Provider>
    );
};

export default NavbarAdmin;
