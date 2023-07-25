import React, { useContext, useEffect, useState } from "react";
import { ActionIcon, Flex, Header as MHeader, MediaQuery, Skeleton, useMantineTheme } from "@mantine/core";
import { AlignLeft, Search, X } from "react-feather";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@shared/ui";
import { Logo } from "@components/Logo";
import { SidebarMenuContext } from "@app/layouts/UserLayout/utils";
import { extraMenuLinks, menuLinks } from "./constants";
import useStyles from "./HeaderPublicUser.styles";
import { IconBrandMessenger } from "@tabler/icons";
import { Menu } from "./components";
import { useSession } from "@features/auth";

const HeaderPublicUser = () => {
    const router = useRouter();
    const [initialRenderComplete, setInitialRenderComplete] = useState(false);
    const theme = useMantineTheme();
    const { user, isFetchingUser } = useSession();
    const { classes } = useStyles();

    const { openedSidebar, setOpenedSidebar } = useContext(SidebarMenuContext);

    useEffect(() => {
        setInitialRenderComplete(true);
    }, []);

    const handleChangeOpenedSidebar = () => setOpenedSidebar(!openedSidebar);

    const handleRedirectLoginPage = () => {
        router.push("/auth");
        setOpenedSidebar(false);
    };

    const handleRedirectSignUpPage = () => {
        router.push("/auth/sign-up");
        setOpenedSidebar(false);
    };

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

    const renderRightBlock = () => {
        if (!initialRenderComplete || isFetchingUser) {
            return <Skeleton visible={true} w={74} h={50} radius={26} />;
        }

        if (user) {
            return <Menu user={user} />;
        }

        return (
            <>
                <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                    <Button variant="secondary" onClick={handleRedirectSignUpPage}>
                        Регистрация
                    </Button>
                </MediaQuery>
                <Button variant="border" onClick={handleRedirectLoginPage}>
                    Войти
                </Button>
            </>
        );
    };

    return (
        <MHeader classNames={classes} height="auto" fixed={false}>
            <Flex className={classes.inner}>
                <Flex gap={{ lg: 89, md: 44, sm: 16 }}>
                    <Link href="/" className={classes.logoLink} onClick={() => setOpenedSidebar(false)}>
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
                                leftIcon={menuItem.icon}
                                variant="white"
                                sx={{
                                    backgroundColor: router.pathname === menuItem.href.pathname ? theme.colors.grayLight[0] : "transparent",
                                }}
                                onClick={() => router.push(menuItem.href)}
                                key={index}>
                                {menuItem.label}
                            </Button>
                        ))}

                        {/*TODO: Добавить вызов виджета битрикс24*/}
                        <Button className={classes.buttonLink} leftIcon={<IconBrandMessenger />} variant="white">
                            Консультация
                        </Button>
                    </Flex>
                </Flex>

                <Flex className={classes.wrapperRightMenu}>
                    <Flex gap={{ md: 12, sm: 0 }}>
                        {extraMenuLinks.map((extraMenuItem, index) => (
                            <ActionIcon
                                className={classes.actionIcon}
                                sx={{
                                    backgroundColor:
                                        router.pathname === extraMenuItem.href.pathname ? theme.colors.grayLight[0] : "transparent",
                                }}
                                onClick={() => router.push(extraMenuItem.href)}
                                key={index}>
                                {extraMenuItem.icon}
                            </ActionIcon>
                        ))}

                        {/*TODO: Уточнить куда ведет ссылка*/}
                        <ActionIcon className={classes.actionIcon}>
                            <Search />
                        </ActionIcon>
                    </Flex>

                    <Flex align="center" gap={8}>
                        {renderRightBlock()}
                        {renderSidebarBurger()}
                    </Flex>
                </Flex>
            </Flex>
        </MHeader>
    );
};

export default HeaderPublicUser;
