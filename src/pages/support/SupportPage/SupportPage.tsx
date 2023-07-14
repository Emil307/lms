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
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Flex gap={12} align="center" mb={32}>
                <ThemeIcon className={classes.iconMessageDotsWrapper}>
                    <IconMessageDots />
                </ThemeIcon>
                <Heading>Поддержка</Heading>
            </Flex>

            <Flex className={classes.contentContainer}>
                <FaqAccordionList wrapperProps={{ className: classes.faqContainer }} />
                <Box className={classes.chatContainer}>
                    <Heading order={3} lineClamp={1} className={classes.chatHeader}>
                        Задать вопрос поддержке
                    </Heading>
                    <MessageList maxHeightContainer={336} h={478}>
                        <CreateMessageForm pt={24} />
                    </MessageList>
                </Box>
            </Flex>
        </Box>
    );
};

export default SupportPage;
