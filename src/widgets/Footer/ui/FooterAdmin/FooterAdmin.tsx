import React from "react";
import { Container, Flex, Footer as MFooter, Text } from "@mantine/core";
import { Button } from "@shared/ui";
import IconFaceBook from "public/icons/icon24px/social/facebook.svg";
import IconVK from "public/icons/icon24px/social/VK.svg";
import { Logo } from "@components/Logo";
import { useFooterAdminStyles } from "./FooterAdmin.styles";

const FooterAdmin = () => {
    const { classes } = useFooterAdminStyles();
    return (
        <MFooter classNames={classes} height="auto">
            <Flex className={classes.inner} align="center" justify="space-between">
                <Flex gap={48}>
                    <Logo />
                    <Flex direction="column">
                        <Container m={0} p={0}>
                            <Text fw={500} fz={18} lh="24px">
                                <a href="mailto:info@gb-business.ru">info@gb-business.ru</a>
                            </Text>
                        </Container>
                        <Container mt={8} ml={0} p={0}>
                            <Text fw={500} fz={12} lh="16px" color="gray45">
                                Пишите, если есть вопросы
                            </Text>
                        </Container>
                    </Flex>
                    <Flex direction="column">
                        <Container m={0} p={0}>
                            <Text fw={500} fz={18} lh="24px">
                                <a href="tel:8 (800) 234-94-04">8 (800) 234-94-04</a>
                            </Text>
                        </Container>
                        <Container mt={8} ml={0} p={0} maw={180}>
                            <Text size="md" fw={500} fz={12} color="gray45">
                                Звоните, если нужна помощь. Звонок по России бесплатный.
                            </Text>
                        </Container>
                    </Flex>
                </Flex>
                <Flex gap={16}>
                    <Button size="large" sx={{ padding: 16 }}>
                        <IconFaceBook />
                    </Button>
                    <Button size="large" sx={{ padding: 16 }}>
                        <IconVK />
                    </Button>
                </Flex>
            </Flex>
            <Container h={48} mt={8} pt={16} pb={16} ta="center">
                <Text fw={500} fz="md" lh="lg">
                    © 2023, Галерея бизнеса
                </Text>
            </Container>
        </MFooter>
    );
};

export default FooterAdmin;
