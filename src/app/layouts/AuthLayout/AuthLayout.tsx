import { Box, Flex } from "@mantine/core";
import { AppShell } from "@mantine/core";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import backgroundImageAuth from "public/background-image-auth.png";
import { Paragraph } from "@shared/ui";
import useStyles from "./AuthLayout.styles";

export default function AuthLayout({ children }: React.PropsWithChildren) {
    const { classes } = useStyles();

    return (
        <AppShell className={classes.root}>
            <Box className={classes.imageWrapper}>
                <Image
                    src={backgroundImageAuth}
                    alt="background"
                    fill
                    sizes="100vw"
                    priority
                    quality={100}
                    style={{
                        objectFit: "cover",
                    }}
                />
            </Box>
            <Flex className={classes.content}>{children}</Flex>
            <Flex className={classes.footerPanel}>
                <Paragraph variant="text-small-m" color="white">
                    &#169; {`${new Date().getFullYear()}, Addamant `}
                </Paragraph>
                <Flex className={classes.linksGroup}>
                    <Link className={classes.link} href="/user-agreement">
                        Обработка персональных данных
                    </Link>
                    <Link className={classes.link} href="/user-agreement">
                        Пользовательское соглашение
                    </Link>
                </Flex>
            </Flex>
        </AppShell>
    );
}
