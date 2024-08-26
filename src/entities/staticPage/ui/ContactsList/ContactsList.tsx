import { Flex } from "@mantine/core";
import React from "react";
import { Paragraph } from "@shared/ui";
import { CONTACT } from "@entities/staticPage";
import IconWhatsapp from "public/icons/icon24px/social/whatsapp.svg";
import IconTelegram from "public/icons/icon24px/social/telegram.svg";
import IconVK from "public/icons/icon24px/social/VK.svg";
import useStyles from "./ContactsList.styles";

interface ContactsListProps {
    address: string;
}

const ContactsList = ({ address }: ContactsListProps) => {
    const { classes } = useStyles();

    return (
        <Flex className={classes.root}>
            <Flex className={classes.list}>
                <Flex className={classes.listItem}>
                    <Paragraph variant="text-caption" color="gray45">
                        По вопросам покупки курсов
                    </Paragraph>
                    <Paragraph variant="small-m">{CONTACT.PHONE_NUMBER}</Paragraph>
                </Flex>
                <Flex className={classes.listItem}>
                    <Paragraph variant="text-caption" color="gray45">
                        Пишите, если есть вопросы
                    </Paragraph>
                    <Paragraph variant="small-m">{CONTACT.EMAIL}</Paragraph>
                </Flex>
                <Flex className={classes.listItem}>
                    <Paragraph variant="small-m">{address}</Paragraph>
                </Flex>
            </Flex>
            <Flex gap={8}>
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

export default ContactsList;
