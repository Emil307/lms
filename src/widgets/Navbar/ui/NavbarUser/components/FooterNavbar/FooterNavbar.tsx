import { Flex, ThemeIcon } from "@mantine/core";
import IconWhatsapp from "public/icons/icon24px/social/whatsapp.svg";
import IconTelegram from "public/icons/icon24px/social/telegram.svg";
import IconVK from "public/icons/icon24px/social/VK.svg";
import { CONTACT } from "@entities/staticPage";
import { Paragraph } from "@shared/ui";
import useStyles from "./FooterNavbar.styles";

const FooterNavbar = () => {
    const { classes } = useStyles();

    return (
        <Flex direction="column" gap={24}>
            <a className={classes.tgLink} href={CONTACT.TELEGRAM_BOT} target="_blank" rel="noreferrer">
                <Flex align="center" gap={16}>
                    <ThemeIcon className={classes.buttonIcon}>
                        <IconTelegram />
                    </ThemeIcon>
                    <Flex direction="column">
                        <Paragraph variant="small-m">Поддержка в Telegram</Paragraph>
                        <Paragraph className={classes.email} variant="text-small-m" color="neutralMain50">
                            {CONTACT.EMAIL}
                        </Paragraph>
                    </Flex>
                </Flex>
            </a>
            <Flex className={classes.emailAndPhone}>
                <Paragraph component="a" variant="large" href={`mailto:${CONTACT.EMAIL}`}>
                    {CONTACT.EMAIL}
                </Paragraph>
                <Paragraph variant="text-caption" color="neutralMain50">
                    Пишите, если есть вопросы
                </Paragraph>
            </Flex>
            <Flex className={classes.emailAndPhone}>
                <Paragraph component="a" variant="large" href={`tel:${CONTACT.PHONE_NUMBER_LINK}`}>
                    {CONTACT.PHONE_NUMBER}
                </Paragraph>
                <Paragraph variant="text-caption" color="neutralMain50">
                    Звоните, если нужна помощь.
                    <br />
                    Звонок по России бесплатный.
                </Paragraph>
            </Flex>

            <Flex gap={16}>
                <a href={CONTACT.VK} target="_blank" rel="noreferrer">
                    <Flex className={classes.socialLinkInner}>
                        <IconVK />
                    </Flex>
                </a>

                <a href={CONTACT.WHATSAPP} target="_blank" rel="noreferrer">
                    <Flex className={classes.socialLinkInner}>
                        <IconWhatsapp />
                    </Flex>
                </a>

                <a href={CONTACT.TELEGRAM} target="_blank" rel="noreferrer">
                    <Flex className={classes.socialLinkInner}>
                        <IconTelegram />
                    </Flex>
                </a>
            </Flex>
        </Flex>
    );
};

export default FooterNavbar;
