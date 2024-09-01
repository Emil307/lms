import React, { useContext } from "react";
import { ActionIcon, Flex, Header as MHeader, useMantineTheme } from "@mantine/core";
import { X } from "react-feather";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@shared/ui";
import { Logo } from "@components/Logo";
import { useSession } from "@entities/auth/hooks";
import { Menu as NotificationMenu } from "@widgets/notifications";
import { SidebarMenuContext } from "@app/layouts/UserLayout/utils";
import LogoImage from "@public/icons/logoNew.svg";
import LogoShortImage from "@public/icons/logoShort.svg";
import IconBurger from "public/icons/burger.svg";
import IconHeart from "public/icons/heart2.svg";
import { menuLinks } from "./constants";
import { Menu } from "./components";
import useStyles from "./HeaderUser.styles";

export interface HeaderUserProps {
    isTablet: boolean;
}

const HeaderUser = ({ isTablet }: HeaderUserProps) => {
    const router = useRouter();
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const { user } = useSession();
    const { openedSidebar, setOpenedSidebar } = useContext(SidebarMenuContext);

    const handleChangeOpenedSidebar = () => setOpenedSidebar(!openedSidebar);

    const renderSidebarBurger = () => {
        if (openedSidebar) {
            return (
                <ActionIcon className={classes.closeSidebarIcon} onClick={handleChangeOpenedSidebar}>
                    <X />
                </ActionIcon>
            );
        }

        return (
            <ActionIcon className={classes.burgerSidebarIcon} onClick={handleChangeOpenedSidebar}>
                <IconBurger />
            </ActionIcon>
        );
    };

    return (
        <MHeader classNames={classes} height="auto" fixed={false}>
            <Flex className={classes.inner}>
                <Link className={classes.logo} href="/cabinet" onClick={() => setOpenedSidebar(false)}>
                    <Logo icon={isTablet ? <LogoShortImage /> : <LogoImage />} />
                </Link>
                <Flex className={classes.containerButtonLinks}>
                    {menuLinks.map((menuItem, index) => (
                        <Button
                            className={classes.buttonLink}
                            component={Link}
                            href={menuItem.href}
                            leftIcon={menuItem.icon}
                            variant="white"
                            sx={(theme) => ({
                                backgroundColor: router.pathname.startsWith(menuItem.href.pathname)
                                    ? theme.colors.neutralLight[0]
                                    : "transparent",
                            })}
                            key={index}>
                            {menuItem.label}
                        </Button>
                    ))}
                </Flex>

                <Flex className={classes.wrapperRightMenu}>
                    <Flex gap={{ xs: 4, md: 12 }}>
                        <ActionIcon
                            className={classes.actionIcon}
                            component={Link}
                            href="/my-courses/favorite"
                            sx={{
                                backgroundColor: router.pathname === "/my-courses/favorite" ? theme.colors.neutralLight[0] : "transparent",
                            }}>
                            <IconHeart />
                        </ActionIcon>
                        <NotificationMenu position="bottom-end" />
                    </Flex>
                    <Menu user={user} />
                    {renderSidebarBurger()}
                </Flex>
            </Flex>
        </MHeader>
    );
};

export default HeaderUser;
