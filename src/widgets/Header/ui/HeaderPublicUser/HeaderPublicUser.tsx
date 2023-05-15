import React from "react";
import { ActionIcon, Flex, Header as MHeader } from "@mantine/core";
import { Heart, Search } from "react-feather";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@shared/ui";
import { Logo } from "@components/Logo";
import useStyles from "./HeaderPublicUser.styles";
import { menuLinks } from "./constants";

const HeaderUser = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const handleRedirectLoginPage = () => router.push("/auth");
    const handleRedirectSignUpPage = () => router.push("/auth/sign-up");
    const handleRedirectCoursesPage = () => router.push("/courses");
    const handleRedirectFavoriteCoursesPage = () => router.push("/courses/favorite");

    return (
        <MHeader classNames={classes} height="auto" fixed={false}>
            <Flex className={classes.inner}>
                <Flex gap={89}>
                    <Link href="/" className={classes.logoLink}>
                        <Logo />
                    </Link>
                    <Flex align="center" gap={12}>
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

                <Flex gap={56} align="center">
                    <Flex gap={12}>
                        <ActionIcon className={classes.actionIcon} onClick={handleRedirectCoursesPage}>
                            <Search />
                        </ActionIcon>
                        <ActionIcon className={classes.actionIcon} onClick={handleRedirectFavoriteCoursesPage}>
                            <Heart />
                        </ActionIcon>
                    </Flex>

                    <Flex gap={8}>
                        <Button variant="secondary" onClick={handleRedirectSignUpPage}>
                            Регистрация
                        </Button>
                        <Button variant="border" onClick={handleRedirectLoginPage}>
                            Войти
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </MHeader>
    );
};

export default HeaderUser;
