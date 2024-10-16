import { ColProps, Flex, Grid, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect } from "react";
import Link from "next/link";
import { CourseFromList, useCoursesInfinite } from "@entities/course";
import { Button, EmptyData, Heading, Loader, Paragraph } from "@shared/ui";
import { getPluralString } from "@shared/utils";
import { Card } from "@features/courses";
import { initialParams } from "./constants";
import { adaptGetCoursesRequest } from "./utils";
import { TRouterQueries } from "./types";
import useStyles from "./InfiniteList.styles";

export interface InfiniteListProps {
    colProps?: ColProps;
    onChangeCoursesCount?: (count: number) => void;
    perPage?: number;
}

const InfiniteList = ({ colProps = { md: 4, sm: 12 }, onChangeCoursesCount, perPage = initialParams.perPage }: InfiniteListProps) => {
    const router = useRouter();
    const params = router.query as TRouterQueries;
    const { classes } = useStyles();

    const {
        data: coursesData,
        isLoading,
        isFetching,
        hasNextPage,
        fetchNextPage,
    } = useCoursesInfinite(adaptGetCoursesRequest({ ...initialParams, perPage, ...params }), router.isReady);

    const handleMoreCourses = () => {
        fetchNextPage();
    };

    useEffect(() => {
        if (onChangeCoursesCount && coursesData) {
            onChangeCoursesCount(coursesData.pagination.total || 0);
        }
    }, [coursesData, onChangeCoursesCount]);

    const handleClickCard = useCallback((_id: unknown, course: CourseFromList) => {
        router.push({ pathname: "/courses/[id]", query: { id: String(course.id) } });
    }, []);

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
                <Grid gutter={24} m={0}>
                    {coursesData.data.map((course) => (
                        <Grid.Col {...colProps} px={0} py={12} key={course.id}>
                            <Card data={course} onClick={handleClickCard} buttonVariant="favorite" />
                        </Grid.Col>
                    ))}
                </Grid>
                {hasNextPage && (
                    <Button className={classes.buttonMore} variant="border" size="large" loading={isFetching} onClick={handleMoreCourses}>
                        Еще {initialParams.perPage} {getPluralString(initialParams.perPage, "курс", "курса", "курсов")}
                    </Button>
                )}
            </Flex>
        );
    };

    return <>{renderContent()}</>;
};

export default memo(InfiniteList);
