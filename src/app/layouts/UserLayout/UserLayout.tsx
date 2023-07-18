import { Box } from "@mantine/core";
import { AppShell } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useMediaQuery, useScrollLock } from "@mantine/hooks";
import { FooterUser } from "@widgets/Footer";
import { HeaderPublicUser, HeaderUser } from "@widgets/Header";
import { useSession } from "@features/auth";
import { NavbarUser } from "@widgets/Navbar";
import useStyles from "./UserLayout.styles";
import { SidebarMenuContext } from "./utils";

export default function UserLayout({ children }: React.PropsWithChildren) {
    const [openedSidebar, setOpenedSidebar] = useState(false);
    const { classes } = useStyles();
    const { user } = useSession();

    const [_scrollLocked, setScrollLocked] = useScrollLock();

    const isMobile = useMediaQuery("(max-width: 744px)");

    useEffect(() => {
        if (!isMobile && openedSidebar) {
            setOpenedSidebar(false);
        }
        setScrollLocked(isMobile && openedSidebar);
    }, [isMobile, openedSidebar]);

    const renderHeader = user?.id ? <HeaderUser /> : <HeaderPublicUser />;

    return (
        <SidebarMenuContext.Provider value={{ openedSidebar, setOpenedSidebar }}>
            <AppShell
                padding={16}
                classNames={classes}
                layout="alt"
                header={renderHeader}
                navbar={<NavbarUser hidden={!openedSidebar} isPublic={!user?.id} />}
                footer={<FooterUser hidden={openedSidebar} />}>
                <Box className={classes.wrapperContent}>{children}</Box>
            </AppShell>
        </SidebarMenuContext.Provider>
    );
}
