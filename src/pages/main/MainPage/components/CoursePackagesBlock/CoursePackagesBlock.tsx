import { Box, BoxProps } from "@mantine/core";
import React from "react";
import { CarouselList as CoursePackageCarouselList } from "@widgets/coursePackage";
import { useIntersection } from "@shared/utils";

export interface CoursePackagesBlockProps extends BoxProps { }

export const CoursePackagesBlock = (props: CoursePackagesBlockProps) => {
    const { ref: rootBlockRef, entry } = useIntersection();

    return (
        <Box ref={rootBlockRef}>
            <CoursePackageCarouselList title="Пакетные предложения" visible={entry?.isIntersecting} {...props} />
        </Box>
    );
};

export default CoursePackagesBlock;
