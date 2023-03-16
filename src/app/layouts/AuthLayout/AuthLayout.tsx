import { Box, Footer, Group, Text } from "@mantine/core";
import { AppShell } from "@mantine/core";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import backgroundImageAuth from "public/background-image-auth.png";
import useStyles from "./AuthLayout.styles";

export default function AuthLayout({ children }: React.PropsWithChildren) {
    const { classes } = useStyles();
    return (
        <Box>
            <Image src={backgroundImageAuth} alt="background" layout="fill" objectFit="cover" objectPosition="center" />
            <AppShell
                footer={
                    <Footer height="auto" p="lg" bg="transparent" className={classes.footerRoot}>
                        <Group className={classes.footerInner}>
                            <Text className={classes.footerTitle}>&#169; {`${new Date().getFullYear()}, Галерея бизнеса `}</Text>
                            <Group className={classes.linksGroup}>
                                <Link className={classes.link} href="/">
                                    Обработка персональных данных
                                </Link>
                                <Link className={classes.link} href="/">
                                    Пользовательское соглашение
                                </Link>
                            </Group>
                        </Group>
                    </Footer>
                }>
                <Box sx={{ display: "flex", alignItems: "center", maxWidth: 456, marginInline: "auto", height: "100%" }}>{children}</Box>
            </AppShell>
        </Box>
    );
}
