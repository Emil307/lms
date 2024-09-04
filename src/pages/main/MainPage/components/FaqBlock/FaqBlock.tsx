import { Flex, FlexProps } from "@mantine/core";
import React from "react";
import { AccordionList as FaqAccordionList } from "@features/faq";
import { useIntersection } from "@shared/utils";
import useStyles from "./FaqBlock.styles";

export interface FaqBlockProps extends FlexProps {}

const FaqBlock = (props: FaqBlockProps) => {
    const { classes } = useStyles();
    const { ref: rootBlockRef, entry } = useIntersection();

    return (
        <Flex ref={rootBlockRef} justify="center" className={classes.wrapper}>
            <FaqAccordionList wrapperProps={{ ...props }} visible={!!entry?.isIntersecting} isStatic />
        </Flex>
    );
};
export default FaqBlock;
