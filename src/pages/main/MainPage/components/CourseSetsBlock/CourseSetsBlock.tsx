import { Box, BoxProps } from "@mantine/core";
import React from "react";
import { useIntersection } from "@mantine/hooks";
import { List as CourseSetList } from "@features/courseSets";

export interface CourseSetsBlockProps extends BoxProps {}

const CourseSetsBlock = (props: CourseSetsBlockProps) => {
    const titleCourseSets = `Топовые подборки курсов ${new Date().getFullYear()}`;

    const { ref: rootBlockRef, entry } = useIntersection();

    return (
        <Box ref={rootBlockRef}>
            <CourseSetList
                hasCardMore
                perPage={2}
                colProps={{ sm: 4, xs: 12 }}
                title={titleCourseSets}
                skeletonListProps={{
                    mih: 258,
                    radius: 16,
                }}
                visible={!!entry?.isIntersecting}
                wrapperProps={{ direction: "column", gap: 32, ...props }}
            />
        </Box>
    );
};

export default CourseSetsBlock;
