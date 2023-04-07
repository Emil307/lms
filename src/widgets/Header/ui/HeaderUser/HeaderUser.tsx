import React, { ReactNode } from "react";
import { Flex, Group, Header as MHeader, ThemeIcon } from "@mantine/core";
import { IconBrandMessenger } from "@tabler/icons-react";
import { Folder, Heart } from "react-feather";
import { useRouter } from "next/router";
import { Route } from "nextjs-routes";
import Link from "next/link";
import { Button } from "@shared/ui";
import { Logo } from "@components/Logo";
import { useSession } from "@features/auth";
import useStyles from "./HeaderUser.styles";

const menuLinks: { label: string; href: Route; icon: ReactNode }[] = [
    {
        label: "Все курсы",
        href: { pathname: "/courses" },
        icon: <Folder />,
    },
    {
        label: "Консультация",
        href: { pathname: "/" },
        icon: <IconBrandMessenger />,
    },
];

const HeaderUser = () => {
    const router = useRouter();
    const { classes } = useStyles();
    const { user } = useSession();

    const handleRedirectLogin = () => router.push("/auth");
    const handleRedirectSignUp = () => router.push("/auth/sign-up");

    return (
        <MHeader classNames={classes} height="auto" fixed={false}>
            <Flex className={classes.inner}>
                <Group sx={{ gap: 89 }}>
                    <Link href="/" className={classes.logoLink}>
                        <Logo />
                    </Link>
                    <Group sx={{ gap: 12 }}>
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
                    </Group>
                </Group>

                {!user && (
                    <Group sx={{ gap: 56 }}>
                        <Group>
                            <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                                <Heart />
                            </ThemeIcon>
                        </Group>

                        <Group sx={{ gap: 8 }}>
                            <Button variant="secondary" onClick={handleRedirectSignUp}>
                                Регистрация
                            </Button>
                            <Button variant="border" onClick={handleRedirectLogin}>
                                Войти
                            </Button>
                        </Group>
                    </Group>
                )}
            </Flex>
        </MHeader>
    );
};

export default HeaderUser;
