import { Box, FlexProps } from "@mantine/core";
import React from "react";
import { AccordionList as FaqAccordionList } from "@features/faq";
import { useIntersection } from "@shared/utils";

export interface FaqBlockProps extends FlexProps {}

const FaqBlock = (props: FaqBlockProps) => {
    const { ref: rootBlockRef, entry } = useIntersection();

    return (
        <Box ref={rootBlockRef}>
            <FaqAccordionList title="Вопрос-ответ" wrapperProps={{ gap: 32, ...props }} visible={!!entry?.isIntersecting} isStatic />
        </Box>
    );
};

export default FaqBlock;
