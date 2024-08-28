import { Flex, FlexProps } from "@mantine/core";
import React from "react";
import { AccordionList as FaqAccordionList } from "@features/faq";
import { useIntersection } from "@shared/utils";

export interface FaqBlockProps extends FlexProps {}

const FaqBlock = (props: FaqBlockProps) => {
    const { ref: rootBlockRef, entry } = useIntersection();

    return (
        <Flex ref={rootBlockRef} justify={"center"}>
            <FaqAccordionList wrapperProps={{ ...props }} visible={!!entry?.isIntersecting} isStatic />
        </Flex>
    );
};

export default FaqBlock;
