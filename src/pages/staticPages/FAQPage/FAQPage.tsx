import { Box, MediaQuery } from "@mantine/core";
import React from "react";
import { BreadCrumbs, Heading } from "@shared/ui";
import { AccordionList as FaqAccordionList } from "@features/faq";
import { breadCrumbsItems } from "./constants";

const FAQPage = () => {
    return (
        <Box>
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
            </MediaQuery>
            <Heading mb={32}>Вопрос-ответ</Heading>
            <FaqAccordionList />
        </Box>
    );
};

export default FAQPage;
