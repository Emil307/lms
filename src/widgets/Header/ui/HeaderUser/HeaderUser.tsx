import React, { useContext } from "react";
import { ActionIcon, Flex, Header as MHeader, HeaderProps as MHeaderProps, useMantineTheme } from "@mantine/core";
import { AlignLeft, Heart, X } from "react-feather";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@shared/ui";
import { Logo } from "@components/Logo";
import { useSession } from "@features/auth";
import { Menu as NotificationMenu } from "@widgets/notifications";
import { SidebarMenuContext } from "@app/layouts/UserLayout/utils";
import { menuLinks } from "./constants";
import { Menu } from "./components";
import useStyles from "./HeaderUser.styles";

export interface HeaderUserProps extends Omit<MHeaderProps, "children" | "height"> {}

const HeaderUser = ({ ...props }: HeaderUserProps) => {
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
                <AlignLeft />
            </ActionIcon>
        );
    };

    return (
        <MHeader {...props} classNames={classes} height="auto" fixed={false}>
            <Flex className={classes.inner}>
                <Flex align="center" gap={{ md: 89, sm: 8 }}>
                    <Link href="/cabinet" className={classes.logoLink} onClick={() => setOpenedSidebar(false)}>
                        <Logo
                            className={classes.logo}
                            textProps={{
                                className: classes.logoText,
                            }}
                        />
                    </Link>
                    <Flex className={classes.containerButtonLinks}>
                        {menuLinks.map((menuItem, index) => (
                            <Button
                                className={classes.buttonLink}
                                key={index}
                                leftIcon={menuItem.icon}
                                variant="white"
                                sx={(theme) => ({
                                    backgroundColor: router.pathname.startsWith(menuItem.href.pathname)
                                        ? theme.colors.grayLight[0]
                                        : "transparent",
                                })}
                                onClick={() => router.push(menuItem.href)}>
                                {menuItem.label}
                            </Button>
                        ))}
                    </Flex>
                </Flex>

                <Flex className={classes.wrapperRightMenu}>
                    <Flex gap={{ md: 12, sm: 0 }}>
                        <ActionIcon
                            className={classes.actionIcon}
                            sx={{
                                backgroundColor: router.pathname === "/my-courses/favorite" ? theme.colors.grayLight[0] : "transparent",
                            }}
                            onClick={() => router.push("/my-courses/favorite")}>
                            <Heart />
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
