import { Box, Title } from "@mantine/core";
import React from "react";
import { BreadCrumbs } from "@shared/ui";
import { AccordionList as FaqAccordionList } from "@features/faq";
import { breadCrumbsItems } from "./constants";
import useStyles from "./FAQPage.styles";

const FAQPage = () => {
    const { classes } = useStyles();
    return (
        <Box className={classes.root}>
            <Box>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
                <Title order={1} color="dark">
                    Вопрос-ответ
                </Title>
            </Box>
            <FaqAccordionList />
        </Box>
    );
};

export default FAQPage;
