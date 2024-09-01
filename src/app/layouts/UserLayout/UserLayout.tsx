import { Box, AppShell } from "@mantine/core";
import React, { useEffect, useState, useContext, useMemo } from "react";
import { useScrollLock } from "@mantine/hooks";
import { useRouter } from "next/router";
import { FooterUser } from "@widgets/Footer";
import { HeaderUserWrapper } from "@widgets/Header";
import { NavbarPublicUser, NavbarUser } from "@widgets/Navbar";
import { useMedia } from "@shared/utils";
import { SessionContext } from "@app/providers/SessionProvider";
import useStyles from "./UserLayout.styles";
import { SidebarMenuContext, useWideLayout } from "./utils";

export default function UserLayout({ children }: React.PropsWithChildren) {
    const [openedSidebar, setOpenedSidebar] = useState(false);
    const { classes } = useStyles();
    const router = useRouter();

    const [_scrollLocked, setScrollLocked] = useScrollLock();
    const isWideLayout = useWideLayout();

    const isMobile = useMedia("sm");

    const ctx = useContext(SessionContext);

    const isAuthorized = !!ctx.user?.id;

    useEffect(() => {
        if (isMobile) {
            setOpenedSidebar(false);
        }
    }, [router.pathname]);

    useEffect(() => {
        if (!isMobile && openedSidebar) {
            setOpenedSidebar(false);
        }
        setScrollLocked(isMobile && openedSidebar);
    }, [isMobile, openedSidebar]);

    const contextValue = useMemo(() => ({ openedSidebar, setOpenedSidebar }), [openedSidebar, setOpenedSidebar]);

    return (
        <SidebarMenuContext.Provider value={contextValue}>
            <AppShell
                padding={16}
                classNames={classes}
                layout="alt"
                data-wide={isWideLayout}
                header={<HeaderUserWrapper />}
                navbar={isAuthorized ? <NavbarUser hidden={!openedSidebar} /> : <NavbarPublicUser hidden={!openedSidebar} />}
                footer={<FooterUser hidden={openedSidebar} />}>
                <Box className={classes.wrapperContent} data-wide={isWideLayout}>
                    {children}
                </Box>
            </AppShell>
        </SidebarMenuContext.Provider>
    );
}
