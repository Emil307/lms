import { Box, Flex, MediaQuery } from "@mantine/core";
import React from "react";
import { BreadCrumbs, Display, Paragraph } from "@shared/ui";
import { AccordionList as FaqAccordionList } from "@features/faq";
import { breadCrumbsItems } from "./constants";
import useStyles from "./FAQPage.styles";

const FAQPage = () => {
    const { classes } = useStyles();

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={16} />
            <Flex className={classes.wrapper}>
                <Flex direction="column" gap={24} maw={667}>
                    <Display>Вопросы и ответы</Display>
                    <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                        <Paragraph variant="large" color="neutralMain50">
                            Если у вас есть вопросы, вы всегда можете задать его нашим специалистам. Мы ответим максимально быстро
                        </Paragraph>
                    </MediaQuery>
                </Flex>
                <FaqAccordionList titleProps={{ display: "none" }} skeletonTitleProps={{ display: "none" }} />
            </Flex>
        </Box>
    );
};

export default FAQPage;
