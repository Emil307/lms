import { Box, Center, Flex, Stack } from "@mantine/core";
import { useCoursesInfinite } from "@entities/course";
import { Card } from "@features/courses";
import { Button, Paragraph } from "@shared/ui";
import { initialParamsForCourseCollections } from "./constants";
import { Skeleton } from "./components";

export const CoursesList = ({ collectionIds }: { collectionIds: string }) => {
    const {
        data: coursesData,
        isLoading,
        isFetching,
        hasNextPage,
        fetchNextPage,
    } = useCoursesInfinite({ ...initialParamsForCourseCollections, filter: { collectionIds } });

    if (isLoading) {
        return <Skeleton />;
    }

    if (!coursesData?.data.length) {
        return <Paragraph variant="large">Нет данных</Paragraph>;
    }

    return (
        <Stack spacing={48}>
            <Flex gap={24} wrap="wrap">
                {coursesData.data.map((x) => (
                    <Box key={x.id} w={{ base: "100%", sm: 343, md: 500, lg: 424 }} mb={8}>
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
