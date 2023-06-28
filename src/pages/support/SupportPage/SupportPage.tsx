import { Box, Flex, ThemeIcon, Title } from "@mantine/core";
import React from "react";
import { BreadCrumbs } from "@shared/ui";
import { AccordionList as FaqAccordionList } from "@features/faq";
import IconMessageDots from "public/icons/messageDots.svg";
import { CreateMessageForm, MessageList } from "@features/support";
import { breadCrumbsItems } from "./constants";
import useStyles from "./SupportPage.styles";

const SupportPage = () => {
    const { classes } = useStyles();
    return (
        <Box className={classes.root}>
            <Box>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
                <Flex gap={12} align="center">
                    <ThemeIcon color="primaryHover" variant="outline" className={classes.iconMessageDots}>
                        <IconMessageDots />
                    </ThemeIcon>
                    <Title order={1} color="dark">
                        Поддержка
                    </Title>
                </Flex>
            </Box>
            <Flex gap={24}>
                <FaqAccordionList wrapperProps={{ w: "100%", maw: 840 }} />
                <Box className={classes.chatContainer}>
                    <Title order={3} color="dark" lineClamp={1} className={classes.chatHeader}>
                        Задать вопрос поддержке
                    </Title>
                    <MessageList maxHeightContainer={314} h={456}>
                        <CreateMessageForm pt={24} />
                    </MessageList>
                </Box>
            </Flex>
        </Box>
    );
};

export default SupportPage;
