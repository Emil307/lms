import { Flex, Stack, Box, Center } from "@mantine/core";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";
import Link from "next/link";
import { useCoursesInfinite } from "@entities/course";
import { Button, EmptyData, Heading, Loader, Paragraph } from "@shared/ui";
import { Card } from "@features/courses";
import { initialParams } from "./constants";
import { adaptGetCoursesRequest } from "./utils";
import { TRouterQueries } from "./types";

export interface InfiniteListProps {
    onChangeCoursesCount?: (count: number) => void;
    perPage?: number;
}

const InfiniteList = ({ onChangeCoursesCount, perPage = initialParams.perPage }: InfiniteListProps) => {
    const router = useRouter();
    const params = router.query as TRouterQueries;

    const {
        data: coursesData,
        isLoading,
        isFetching,
        hasNextPage,
        fetchNextPage,
    } = useCoursesInfinite(adaptGetCoursesRequest({ ...initialParams, perPage, ...params }), router.isReady);

    useEffect(() => {
        if (onChangeCoursesCount && coursesData) {
            onChangeCoursesCount(coursesData.pagination.total || 0);
        }
    }, [coursesData, onChangeCoursesCount]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <Flex h={492} align="center" justify="center">
                    <Loader size="lg" />
                </Flex>
            );
        }

        if (!coursesData?.data.length && Object.values(params).find((param) => !!param)) {
            return (
                <Stack spacing={32}>
                    <Stack spacing={8}>
                        <Heading order={2} maw={250}>
                            По этому запросу пока нет программ
                        </Heading>
                        <Paragraph variant="large" color="neutral_main50" maw={320}>
                            Попробуйте набрать другой запрос или посмотрите курсы в каталоге
                        </Paragraph>
                    </Stack>
                    <Button component={Link} href="/courses" variant="border" maw={126}>
                        Все курсы
                    </Button>
                </Stack>
            );
        }

        if (!coursesData?.data.length) {
            return <EmptyData title="Курсов не найдено" />;
        }

        return (
            <Flex direction="column" gap={48} w="100%">
                <Flex gap={24} wrap="wrap">
                    {coursesData.data.map((course) => (
                        <Box key={course.id} w={{ base: "100%", sm: 343, md: 500, lg: 424 }} mb={{ base: 0, sm: 8 }}>
                            <Card data={course} />
                        </Box>
                    ))}
                </Flex>
                {hasNextPage && (
                    <Center>
                        <Button variant="border" size="large" loading={isFetching} onClick={fetchNextPage}>
                            Показать еще
                        </Button>
                    </Center>
                )}
            </Flex>
        );
    };

    return <>{renderContent()}</>;
};

export default memo(InfiniteList);
