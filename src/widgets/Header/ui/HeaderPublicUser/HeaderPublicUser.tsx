import React, { useContext, useEffect, useState } from "react";
import { ActionIcon, Flex, Header as MHeader, MediaQuery, Skeleton, useMantineTheme } from "@mantine/core";
import { AlignLeft, Heart, Search, X } from "react-feather";
import { useRouter } from "next/router";
import Link from "next/link";
import IconShoppingBag from "public/icons/shoppingBag.svg";
import { Button } from "@shared/ui";
import { Logo } from "@components/Logo";
import { SidebarMenuContext } from "@app/layouts/UserLayout/utils";
import { useSession } from "@entities/auth/hooks";
import useStyles from "./HeaderPublicUser.styles";
import { Menu } from "./components";

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
            return <Skeleton w={74} h={50} radius={26} />;
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
                        <Button
                            className={classes.buttonLink}
                            leftIcon={<IconShoppingBag />}
                            variant="white"
                            sx={{
                                backgroundColor: router.pathname.includes("/courses") ? theme.colors.grayLight[0] : "transparent",
                            }}
                            onClick={() => router.push("/courses")}>
                            Все курсы
                        </Button>
                    </Flex>
                </Flex>

                <Flex className={classes.wrapperRightMenu}>
                    <Flex gap={{ md: 12, sm: 0 }}>
                        <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
                            <ActionIcon className={classes.actionIcon} onClick={() => router.push("/courses")}>
                                <Search />
                            </ActionIcon>
                        </MediaQuery>
                        {user && (
                            <ActionIcon
                                className={classes.actionIcon}
                                sx={{
                                    backgroundColor: router.pathname.includes("/my-courses/favorite")
                                        ? theme.colors.grayLight[0]
                                        : "transparent",
                                }}
                                onClick={() => router.push("/my-courses/favorite")}>
                                <Heart />
                            </ActionIcon>
                        )}
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
