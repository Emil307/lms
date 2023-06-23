import { Box, FlexProps } from "@mantine/core";
import React from "react";
import { useIntersection } from "@mantine/hooks";
import { StaticCarouselList as StaticUserCarouselList } from "@widgets/user";

export interface TeachersBlockProps extends FlexProps {}

const TeachersBlock = (props: TeachersBlockProps) => {
    const { ref: rootBlockRef, entry } = useIntersection();

    return (
        <Box ref={rootBlockRef}>
            <StaticUserCarouselList roleName="teacher" visible={!!entry?.isIntersecting} {...props} />
        </Box>
    );
};

export default TeachersBlock;
