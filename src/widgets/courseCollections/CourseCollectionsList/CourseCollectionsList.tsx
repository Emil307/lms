import { Box, Center, Flex, Stack } from "@mantine/core";
import React from "react";
import { useCourseCollectionsInfinite } from "@entities/courseCollection";
import { Card } from "@features/courseCollections";
import { Button, Loader, Paragraph } from "@shared/ui";
import { initialParamsForCourseCollections } from "./constants";

const CourseCollectionsList: React.FC = () => {
    const {
        data: courseCollectionsData,
        isLoading,
        isFetching,
        hasNextPage,
        fetchNextPage,
    } = useCourseCollectionsInfinite({ ...initialParamsForCourseCollections });

    if (isLoading) {
        return <Loader />;
    }

    if (!courseCollectionsData?.data.length) {
        return <Paragraph variant="large">Нет данных</Paragraph>;
    }

    return (
        <Stack spacing={48}>
            <Flex gap={24} wrap="wrap">
                {courseCollectionsData.data.map((x) => (
                    <Box key={x.id} w={{ base: "100%", sm: 343, md: 500, lg: 424 }} mb={{ base: 0, sm: 8 }}>
                        <Card key={x.id} data={x} />
                    </Box>
                ))}
            </Flex>
            {!!hasNextPage && (
                <Center>
                    <Button variant="border" size="large" onClick={fetchNextPage} loading={isFetching}>
                        Показать еще
                    </Button>
                </Center>
            )}
        </Stack>
    );
};

export default CourseCollectionsList;
