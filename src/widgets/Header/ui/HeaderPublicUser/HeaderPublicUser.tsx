import React, { useContext, useState, useEffect } from "react";
import { ActionIcon, Flex, Header as MHeader, MediaQuery, Skeleton, useMantineTheme } from "@mantine/core";
import { AlignLeft, Heart, Search, X } from "react-feather";
import { useRouter } from "next/router";
import Link from "next/link";
import IconShoppingBag from "public/icons/shoppingBag.svg";
import { Button } from "@shared/ui";
import { Logo } from "@components/Logo";
import { SidebarMenuContext } from "@app/layouts/UserLayout/utils";
import { useSession } from "@entities/auth/hooks";
import LogoImage from "@public/icons/logoNew.svg";
import LogoShortImage from "@public/icons/logoShort.svg";
import { useMedia } from "@shared/utils";
import useStyles from "./HeaderPublicUser.styles";
import { Menu } from "./components";

const HeaderPublicUser = () => {
    const router = useRouter();
    const [initialRenderComplete, setInitialRenderComplete] = useState(false);
    const theme = useMantineTheme();
    const { user, isFetchingUser } = useSession();
    const { classes } = useStyles();

    const isTablet = useMedia("md");
    const { openedSidebar, setOpenedSidebar } = useContext(SidebarMenuContext);

    useEffect(() => {
        setInitialRenderComplete(true);
    }, []);

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
                    <Link href={`${router.asPath}?action=sign-up`}>
                        <Button variant="secondary">Регистрация</Button>
                    </Link>
                </MediaQuery>
                <Link href={`${router.asPath}?action=auth`}>
                    <Button variant="border">Войти</Button>
                </Link>
            </>
        );
    };

    return (
        <MHeader classNames={classes} height="auto" fixed={false}>
            <Flex className={classes.inner}>
                <Flex gap={{ lg: 89, md: 44, sm: 16 }}>
                    <Link href="/" onClick={() => setOpenedSidebar(false)}>
                        <Logo icon={isTablet ? <LogoShortImage /> : <LogoImage />} />
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
