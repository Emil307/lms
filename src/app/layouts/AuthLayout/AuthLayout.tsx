import { Box, Group, Text } from "@mantine/core";
import { AppShell } from "@mantine/core";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import backgroundImageAuth from "public/background-image-auth.png";
import useStyles from "./AuthLayout.styles";

export default function AuthLayout({ children }: React.PropsWithChildren) {
    const { classes } = useStyles();
    return (
        <>
            <AppShell className={classes.root}>
                <Box className={classes.imageWrapper}>
                    <Image
                        src={backgroundImageAuth}
                        alt="background"
                        loader={({ src }) => `${src}`}
                        fill
                        sizes="100vw"
                        style={{
                            objectFit: "cover",
                            objectPosition: "center",
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </Box>
                <Box className={classes.content}>{children}</Box>
                <Group className={classes.footerPanel}>
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
            </AppShell>
        </>
    );
}
