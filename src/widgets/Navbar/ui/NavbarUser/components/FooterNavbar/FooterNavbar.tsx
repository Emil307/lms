import React from "react";
import { Flex, FlexProps, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import IconWhatsapp from "public/icons/icon24px/social/whatsapp.svg";
import IconTelegram from "public/icons/icon24px/social/telegram.svg";
import IconVK from "public/icons/icon24px/social/VK.svg";
import { CompanyLinks } from "@shared/constant";
import useStyles from "./FooterNavbar.styles";

export interface FooterNavbarProps extends FlexProps {
    isPublic?: boolean;
}

const FooterNavbar = ({ isPublic = false, ...props }: FooterNavbarProps) => {
    const { classes } = useStyles();
    const router = useRouter();

    const handleRedirectSignUpPage = () => router.push("/auth/sign-up");

    return (
        <Flex className={classes.root} {...props}>
            {isPublic && (
                <Button variant="secondary" onClick={handleRedirectSignUpPage} w="fit-content">
                    Регистрация
                </Button>
            )}
            <Flex direction="column" gap={32}>
                <Flex direction="column" maw={179}>
                    <Text component="a" fw={500} fz={18} lh="24px" href="mailto:info@gb-business.ru">
                        info@gb-business.ru
                    </Text>
                    <Text fw={500} fz={12} lh="16px" color="gray45">
                        Пишите, если есть вопросы
                    </Text>
                </Flex>
                <Flex direction="column" maw={179}>
                    <Text component="a" fw={500} fz={18} lh="24px" href="tel:8 (800) 234-94-04">
                        8 (800) 234-94-04
                    </Text>
                    <Text size="md" fw={500} fz={12} color="gray45">
                        Звоните, если нужна помощь. Звонок по России бесплатный.
                    </Text>
                </Flex>
            </Flex>

            <Flex gap={16}>
                <a href={CompanyLinks.VK} target="_blank" rel="noreferrer">
                    <Flex className={classes.socialLinkInner}>
                        <IconVK />
                    </Flex>
                </a>

                <a href={CompanyLinks.WHATSAPP} target="_blank" rel="noreferrer">
                    <Flex className={classes.socialLinkInner}>
                        <IconWhatsapp />
                    </Flex>
                </a>

                <a href={CompanyLinks.TELEGRAM} target="_blank" rel="noreferrer">
                    <Flex className={classes.socialLinkInner}>
                        <IconTelegram />
                    </Flex>
                </a>
            </Flex>
        </Flex>
    );
};

export default FooterNavbar;
