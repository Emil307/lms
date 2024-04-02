import { Box, FlexProps } from "@mantine/core";
import React from "react";
import { StaticCarouselList as StaticUserCarouselList } from "@widgets/user";
import { useIntersection } from "@shared/utils";

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
