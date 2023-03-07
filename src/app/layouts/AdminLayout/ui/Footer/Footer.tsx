import React from "react";
import { Container, Flex, Footer as MFooter, Text } from "@mantine/core";
import Logo from "@components/Logo";
import { useFooterStyles } from "./FooterStyles";
import { X } from "react-feather";
import { defaultTheme } from "@app/providers/Theme/theme";

// export interface FooterProps extends MFooterProps {}

const Footer = () => {
    const { classes } = useFooterStyles();
    return (
        <MFooter classNames={classes} height="auto">
            <Flex className={classes.inner} align="center" justify="space-between">
                <Flex gap={48}>
                    <Logo />
                    <Flex direction="column">
                        <Container m={0} p={0}>
                            <Text fw={500} fz={18} lh="24px">
                                info@gb-business.ru
                            </Text>
                        </Container>
                        <Container mt={8} ml={0} p={0}>
                            <Text fw={500} fz={12} lh="16px" color={defaultTheme.colors?.gray45?.[0]}>
                                Пишите, если есть вопросы
                            </Text>
                        </Container>
                    </Flex>
                    <Flex direction="column">
                        <Container m={0} p={0}>
                            <Text fw={500} fz={18} lh="24px">
                                8 (800) 234-94-04
                            </Text>
                        </Container>
                        <Container mt={8} ml={0} p={0} maw={180}>
                            <Text size="md" fw={500} fz={12} color={defaultTheme.colors?.gray45?.[0]}>
                                Звоните, если нужна помощь. Звонок по России бесплатный.
                            </Text>
                        </Container>
                    </Flex>
                </Flex>
                <Flex>
                    <X />
                    <X />
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

export default Footer;
