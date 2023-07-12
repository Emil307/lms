import React, { useContext } from "react";
import { ActionIcon, Flex, Header as MHeader, MediaQuery } from "@mantine/core";
import { AlignLeft, Heart, Search, X } from "react-feather";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@shared/ui";
import { Logo } from "@components/Logo";
import { SidebarMenuContext } from "@app/layouts/UserLayout/utils";
import { menuLinks } from "./constants";
import useStyles from "./HeaderPublicUser.styles";

const HeaderPublicUser = () => {
    const router = useRouter();
    const { classes } = useStyles();

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

    const handleRedirectLoginPage = () => {
        router.push("/auth");
        setOpenedSidebar(false);
    };
    const handleRedirectSignUpPage = () => {
        router.push("/auth/sign-up");
        setOpenedSidebar(false);
    };
    const handleRedirectCoursesPage = () => {
        router.push("/courses");
        setOpenedSidebar(false);
    };
    const handleRedirectFavoriteCoursesPage = () => {
        router.push("/courses/favorite");
        setOpenedSidebar(false);
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
                                key={index}
                                leftIcon={menuItem.icon}
                                variant="white"
                                sx={{
                                    borderRadius: 160,
                                    padding: "8px 16px",
                                }}
                                onClick={() => router.push(menuItem.href)}>
                                {menuItem.label}
                            </Button>
                        ))}
                    </Flex>
                </Flex>

                <Flex className={classes.wrapperRightMenu}>
                    <Flex gap={{ md: 12, sm: 0 }}>
                        <ActionIcon className={classes.actionIcon} onClick={handleRedirectCoursesPage}>
                            <Search />
                        </ActionIcon>
                        <ActionIcon className={classes.actionIcon} onClick={handleRedirectFavoriteCoursesPage}>
                            <Heart />
                        </ActionIcon>
                    </Flex>

                    <Flex align="center" gap={8}>
                        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                            <Button variant="secondary" onClick={handleRedirectSignUpPage}>
                                Регистрация
                            </Button>
                        </MediaQuery>
                        <Button variant="border" onClick={handleRedirectLoginPage}>
                            Войти
                        </Button>
                        {renderSidebarBurger()}
                    </Flex>
                </Flex>
            </Flex>
        </MHeader>
    );
};

export default HeaderPublicUser;
