import { Box } from "@mantine/core";
import { AppShell } from "@mantine/core";
import React, { useEffect, useState, useContext } from "react";
import { useScrollLock } from "@mantine/hooks";
import { FooterUser } from "@widgets/Footer";
import { HeaderPublicUser, HeaderUser } from "@widgets/Header";
import { NavbarUser } from "@widgets/Navbar";
import { useMedia } from "@shared/utils";
import useStyles from "./UserLayout.styles";
import { SidebarMenuContext } from "./utils";
import { SessionContext } from "@app/providers/SessionProvider";

export default function UserLayout({ children }: React.PropsWithChildren) {
    const [openedSidebar, setOpenedSidebar] = useState(false);
    const { classes } = useStyles();

    const [_scrollLocked, setScrollLocked] = useScrollLock();

    const isMobile = useMedia("sm");

    const ctx = useContext(SessionContext);

    const isAuthorized = ctx.user?.id ? true : false;

    useEffect(() => {
        if (!isMobile && openedSidebar) {
            setOpenedSidebar(false);
        }
        setScrollLocked(isMobile && openedSidebar);
    }, [isMobile, openedSidebar]);

    return (
        <SidebarMenuContext.Provider value={{ openedSidebar, setOpenedSidebar }}>
            <AppShell
                padding={16}
                classNames={classes}
                layout="alt"
                header={isAuthorized ? <HeaderUser /> : <HeaderPublicUser />}
                navbar={<NavbarUser hidden={!openedSidebar} />}
                footer={<FooterUser hidden={openedSidebar} />}>
                <Box className={classes.wrapperContent}>{children}</Box>
            </AppShell>
        </SidebarMenuContext.Provider>
    );
}
