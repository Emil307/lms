import React from "react";
import { ActionIcon, Flex, Header as MHeader } from "@mantine/core";
import { Home } from "react-feather";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@shared/ui";
import { Logo } from "@components/Logo";
import { useSession } from "@features/auth";
import { Menu as NotificationMenu } from "@widgets/notifications";
import { menuLinks } from "./constants";
import { Menu } from "./components";
import useStyles from "./HeaderUser.styles";

const HeaderUser = () => {
    const router = useRouter();
    const { classes } = useStyles();
    const { user } = useSession();

    const handleRedirectHomePage = () => router.push("/");

    return (
        <MHeader classNames={classes} height="auto" fixed={false}>
            <Flex className={classes.inner}>
                <Flex align="center" gap={89}>
                    <Flex gap={24} align="center">
                        <ActionIcon
                            className={classes.actionIcon}
                            sx={(theme) => ({
                                backgroundColor: router.pathname === "/" ? theme.colors.grayLight[0] : "transparent",
                            })}
                            onClick={handleRedirectHomePage}>
                            <Home />
                        </ActionIcon>
                        <Link href="/" className={classes.logoLink}>
                            <Logo />
                        </Link>
                    </Flex>

                    <Flex gap={12}>
                        {menuLinks.map((menuItem, index) => (
                            <Button
                                key={index}
                                leftIcon={menuItem.icon}
                                variant="white"
                                sx={(theme) => ({
                                    borderRadius: 160,
                                    padding: "8px 16px",
                                    backgroundColor: router.pathname.startsWith(menuItem.isCheckRoute)
                                        ? theme.colors.grayLight[0]
                                        : "transparent",
                                })}
                                onClick={() => router.push(menuItem.href)}>
                                {menuItem.label}
                            </Button>
                        ))}
                    </Flex>
                </Flex>

                <Flex align="center" gap={24}>
                    <NotificationMenu position="bottom-end" />
                    <Menu user={user} />
                </Flex>
            </Flex>
        </MHeader>
    );
};

export default HeaderUser;
