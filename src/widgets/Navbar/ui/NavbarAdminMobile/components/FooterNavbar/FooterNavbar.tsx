import React from "react";
import { Flex, FlexProps, Text } from "@mantine/core";
import IconWhatsapp from "public/icons/icon24px/social/whatsapp.svg";
import IconTelegram from "public/icons/icon24px/social/telegram.svg";
import IconVK from "public/icons/icon24px/social/VK.svg";
import { CONTACT } from "@entities/staticPage";
import useStyles from "./FooterNavbar.styles";

export interface FooterNavbarProps extends FlexProps {}

const FooterNavbar = (props: FooterNavbarProps) => {
    const { classes } = useStyles();

    return (
        <Flex className={classes.root} {...props}>
            <Flex direction="column" gap={32}>
                <Flex direction="column" maw={179}>
                    <Text component="a" fw={500} fz={18} lh="24px" href={`mailto:${CONTACT.EMAIL}`}>
                        {CONTACT.EMAIL}
                    </Text>
                    <Text fw={500} fz={12} lh="16px" color="gray45">
                        Пишите, если есть вопросы
                    </Text>
                </Flex>
                <Flex direction="column" maw={179}>
                    <Text component="a" fw={500} fz={18} lh="24px" href={`tel:${CONTACT.PHONE_NUMBER_LINK}`}>
                        {CONTACT.PHONE_NUMBER}
                    </Text>
                    <Text size="md" fw={500} fz={12} color="gray45">
                        Звоните, если нужна помощь. Звонок по России бесплатный.
                    </Text>
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
    );
};

export default FooterNavbar;
