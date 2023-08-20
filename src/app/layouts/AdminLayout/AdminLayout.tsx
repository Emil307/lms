import { Box } from "@mantine/core";
import { AppShell } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useElementSize } from "@mantine/hooks";
import { FooterAdmin } from "@widgets/Footer";
import { HeaderAdmin } from "@widgets/Header";
import { NavbarAdmin, NavbarAdminMobile } from "@widgets/Navbar";
import useStyles from "./AdminLayout.styles";
import { AdminSidebarMenuContext } from "./utils";
import { useMedia } from "@shared/utils";

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

    const renderNavbar = () => {
        if (openedSidebar) {
            return <NavbarAdminMobile hidden={!openedSidebar} />;
        }

        return <NavbarAdmin mah={height + 16} />;
    };

    return (
        <AdminSidebarMenuContext.Provider value={{ openedSidebar, setOpenedSidebar }}>
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
            </AppShell>
        </AdminSidebarMenuContext.Provider>
    );
}
