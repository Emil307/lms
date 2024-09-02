import { Box, AppShell } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { useElementSize } from "@mantine/hooks";
import { FooterAdmin } from "@widgets/Footer";
import { HeaderAdmin } from "@widgets/Header";
import { NavbarAdmin, NavbarAdminMobile } from "@widgets/Navbar";
import { useMedia } from "@shared/utils";
import { CookiePanel } from "@entities/auth";
import useStyles from "./AdminLayout.styles";
import { AdminSidebarMenuContext } from "./utils";

export default function AdminLayout({ children }: React.PropsWithChildren) {
    const { classes } = useStyles();
    const [openedSidebar, setOpenedSidebar] = useState(false);

    const { ref, height } = useElementSize();

    const isMobile = useMedia("sm");

    //для того чтобы скрывать мобильный сайдбар при увеличении размера экрана более 744px
    useEffect(() => {
        if (!isMobile && openedSidebar) {
            setOpenedSidebar(false);
        }
    }, [isMobile]);

    const contextValue = useMemo(() => ({ openedSidebar, setOpenedSidebar }), [openedSidebar, setOpenedSidebar]);

    const renderNavbar = () => {
        if (openedSidebar) {
            return <NavbarAdminMobile hidden={!openedSidebar} />;
        }

        return <NavbarAdmin maxHeight={height} />;
    };

    return (
        <AdminSidebarMenuContext.Provider value={contextValue}>
            <AppShell
                padding={0}
                classNames={classes}
                layout="alt"
                navbar={renderNavbar()}
                header={<HeaderAdmin />}
                footer={<FooterAdmin hidden={openedSidebar} />}>
                <Box ref={ref} className={classes.wrapperContent}>
                    {children}
                </Box>
                <CookiePanel />
            </AppShell>
        </AdminSidebarMenuContext.Provider>
    );
}
