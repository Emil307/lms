import React from "react";
import { Container, Flex, Footer as MFooter, Text } from "@mantine/core";
import IconWhatsapp from "public/icons/icon24px/social/whatsapp.svg";
import IconVK from "public/icons/icon24px/social/VK.svg";
import IconTelegram from "public/icons/icon24px/social/telegram.svg";
import { Logo } from "@components/Logo";
import { useFooterAdminStyles } from "./FooterAdmin.styles";
import { COMPANY_LINK } from "./constants";

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
                    <a href={COMPANY_LINK.VK} target="_blank" rel="noreferrer">
                        <Flex className={classes.link}>
                            <IconVK />
                        </Flex>
                    </a>

                    {/* //TODO: Добавить редирект на whatsapp */}
                    <a target="_blank" rel="noreferrer">
                        <Flex className={classes.link}>
                            <IconWhatsapp />
                        </Flex>
                    </a>

                    <a href={COMPANY_LINK.TELEGRAM} target="_blank" rel="noreferrer">
                        <Flex className={classes.link}>
                            <IconTelegram />
                        </Flex>
                    </a>
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
