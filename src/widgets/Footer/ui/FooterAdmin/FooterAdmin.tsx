import React from "react";
import { Flex, Footer as MFooter, FooterProps as MFooterProps } from "@mantine/core";
import IconWhatsapp from "public/icons/icon24px/social/whatsapp.svg";
import IconVK from "public/icons/icon24px/social/VK.svg";
import IconTelegram from "public/icons/icon24px/social/telegram.svg";
import { Logo } from "@components/Logo";
import { COMPANY_LINKS } from "@shared/constant";
import { Paragraph } from "@shared/ui";
import { useFooterAdminStyles } from "./FooterAdmin.styles";

export interface FooterAdminProps extends Omit<MFooterProps, "children" | "height"> {}

const FooterAdmin = (props: FooterAdminProps) => {
    const { classes } = useFooterAdminStyles();

    return (
        <MFooter classNames={classes} height="auto" {...props}>
            <Flex className={classes.inner}>
                <Flex gap={48}>
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
            <Paragraph variant="text-small-m" className={classes.companyName}>
                © 2023, Галерея бизнеса
            </Paragraph>
        </MFooter>
    );
};

export default FooterAdmin;
