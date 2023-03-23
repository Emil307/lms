import React, { ReactNode } from "react";
import { Flex, Group, Header as MHeader, ThemeIcon } from "@mantine/core";
import { IconBrandMessenger } from "@tabler/icons-react";
import { Folder, Heart } from "react-feather";
import { useRouter } from "next/router";
import { Route } from "nextjs-routes";
import { Button } from "@shared/ui";
import { Logo } from "@components/Logo";
import useStyles from "./HeaderUser.styles";

const menuLinks: { label: string; href: Route; icon: ReactNode }[] = [
    {
        label: "Все курсы",
        href: { pathname: "/" },
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

    return (
        <MHeader classNames={classes} height="auto" fixed={false}>
            <Flex className={classes.inner}>
                <Group sx={{ gap: 89 }}>
                    <Logo />
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

                <Group sx={{ gap: 56 }}>
                    <Group>
                        <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                            <Heart />
                        </ThemeIcon>
                    </Group>
                    <Group sx={{ gap: 8 }}>
                        <Button variant="secondary">Регистрация</Button>
                        <Button variant="border"> Войти</Button>
                    </Group>
                </Group>
            </Flex>
        </MHeader>
    );
};

export default HeaderUser;
