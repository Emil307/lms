import React, { useMemo } from "react";
import { Divider, Flex, Footer as MFooter, Group, Text, FooterProps as MFooterProps } from "@mantine/core";
import Link from "next/link";
import IconWhatsapp from "public/icons/icon24px/social/whatsapp.svg";
import IconTelegram from "public/icons/icon24px/social/telegram.svg";
import IconVK from "public/icons/icon24px/social/VK.svg";
import { Logo } from "@components/Logo";
import { COMPANY_LINKS } from "@shared/constant";
import { Paragraph } from "@shared/ui";
import { pageSections, popularSections } from "./constants";
import useStyles from "./FooterUser.styles";

export interface FooterUserProps extends Omit<MFooterProps, "children" | "height"> {}

const FooterUser = ({ hidden = false, ...props }: FooterUserProps) => {
    const { classes } = useStyles();

    const renderPopularSection = useMemo(
        () =>
            popularSections.map((section, index) => (
                <Link key={index} className={classes.sectionLink} href={section.href}>
                    {section.label}
                </Link>
            )),
        []
    );

    const renderInfoSection = useMemo(
        () =>
            pageSections.map((section, index) => (
                <Link key={index} className={classes.sectionLink} href={section.href}>
                    {section.label}
                </Link>
            )),
        []
    );

    if (hidden) {
        return null;
    }

    return (
        <MFooter classNames={classes} height="auto" {...props}>
            <Flex className={classes.inner}>
                <Flex className={classes.content}>
                    <Flex direction="column" gap={32} miw={264}>
                        <Logo />
                        <Flex direction="column" gap={8}>
                            <Paragraph variant="large">
                                <a href="mailto:info@gb-business.ru">info@gb-business.ru</a>
                            </Paragraph>
                            <Paragraph variant="text-caption" color="gray45">
                                Пишите, если есть вопросы
                            </Paragraph>
                        </Flex>
                        <Flex direction="column" gap={8}>
                            <Paragraph variant="large">
                                <a href="tel:8 (800) 234-94-04">8 (800) 234-94-04</a>
                            </Paragraph>
                            <Paragraph variant="text-caption" color="gray45" maw={180}>
                                Звоните, если нужна помощь. Звонок по России бесплатный.
                            </Paragraph>
                        </Flex>
                    </Flex>

                    <Flex className={classes.popularSectionContainer}>
                        <Text className={classes.titleSection}>Популярные разделы</Text>
                        <Flex direction="column" gap={8}>
                            {renderPopularSection}
                        </Flex>
                    </Flex>

                    <Flex className={classes.infoSectionContainer}>
                        <Text className={classes.titleSection}>Информация</Text>
                        <Flex direction="column" gap={8}>
                            {renderInfoSection}
                        </Flex>
                    </Flex>
                    <Flex gap={16}>
                        <a href={COMPANY_LINKS.VK} target="_blank" rel="noreferrer">
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

                        <a href={COMPANY_LINKS.TELEGRAM} target="_blank" rel="noreferrer">
                            <Flex className={classes.link}>
                                <IconTelegram />
                            </Flex>
                        </a>
                    </Flex>
                </Flex>
                <Divider my="sm" color="gray20" mt={0} mb={0} />
                <Group sx={{ paddingBlock: 32, justifyContent: "space-between" }}>
                    <Paragraph variant="text-small-m">© 2023, Галерея бизнеса</Paragraph>
                    <Text fw={400} td="underline" component="a" href="/user-agreement">
                        Пользовательское соглашение
                    </Text>
                </Group>
            </Flex>
        </MFooter>
    );
};

export default FooterUser;
