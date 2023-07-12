import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { BreadCrumbs, Heading } from "@shared/ui";
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
                    <Heading>Поддержка</Heading>
                </Flex>
            </Box>
            <Flex gap={24}>
                <FaqAccordionList wrapperProps={{ w: "100%", maw: 840 }} />
                <Box className={classes.chatContainer}>
                    <Heading order={3} lineClamp={1} className={classes.chatHeader}>
                        Задать вопрос поддержке
                    </Heading>
                    <MessageList maxHeightContainer={314} h={456}>
                        <CreateMessageForm pt={24} />
                    </MessageList>
                </Box>
            </Flex>
        </Box>
    );
};

export default SupportPage;
