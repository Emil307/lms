import React from "react";
import { Flex, Footer as MFooter, FooterProps as MFooterProps } from "@mantine/core";
import dayjs from "dayjs";
import IconWhatsapp from "public/icons/icon24px/social/whatsapp.svg";
import IconVK from "public/icons/icon24px/social/VK.svg";
import IconTelegram from "public/icons/icon24px/social/telegram.svg";
import { Logo } from "@components/Logo";
import { Paragraph } from "@shared/ui";
import { CONTACT } from "@entities/staticPage";
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
                            <a href={`mailto:${CONTACT.EMAIL}`}>{CONTACT.EMAIL}</a>
                        </Paragraph>
                        <Paragraph variant="text-caption" color="gray45">
                            Пишите, если есть вопросы
                        </Paragraph>
                    </Flex>
                    <Flex direction="column" gap={8}>
                        <Paragraph variant="large">
                            <a href={`tel:${CONTACT.PHONE_NUMBER_LINK}`}>{CONTACT.PHONE_NUMBER}</a>
                        </Paragraph>
                        <Paragraph variant="text-caption" color="gray45" maw={180}>
                            Звоните, если нужна помощь. Звонок по России бесплатный.
                        </Paragraph>
                    </Flex>
                </Flex>
                <Flex gap={16}>
                    <a href={CONTACT.VK} target="_blank" rel="noreferrer">
                        <Flex className={classes.socialLink}>
                            <IconVK />
                        </Flex>
                    </a>

                    <a href={CONTACT.WHATSAPP} target="_blank" rel="noreferrer">
                        <Flex className={classes.socialLink}>
                            <IconWhatsapp />
                        </Flex>
                    </a>

                    <a href={CONTACT.TELEGRAM} target="_blank" rel="noreferrer">
                        <Flex className={classes.socialLink}>
                            <IconTelegram />
                        </Flex>
                    </a>
                </Flex>
            </Flex>
            <Paragraph variant="text-small-m" className={classes.companyName}>
                {`© ${dayjs().year()}, Addamant`}
            </Paragraph>
        </MFooter>
    );
};

export default FooterAdmin;
