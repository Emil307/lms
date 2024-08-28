import { Box, BoxProps } from "@mantine/core";
import React from "react";
import { List as CourseSetList } from "@features/courseCollections";
import { useIntersection } from "@shared/utils";

export interface CourseCollectionsBlockProps extends BoxProps {}

const CourseCollectionsBlock = (props: CourseCollectionsBlockProps) => {
    const { ref: rootBlockRef, entry } = useIntersection();

    return (
        <Box ref={rootBlockRef}>
            <CourseSetList
                hasCardMore
                colProps={{ sm: 6, md: 4 }}
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

export default CourseCollectionsBlock;
