import { ColProps, Flex, Grid, Skeleton } from "@mantine/core";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect } from "react";
import { CourseFromList, useCoursesInfinite } from "@entities/course";
import { Button, EmptyData, Loader } from "@shared/ui";
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
            return <Loader size="lg" />;
        }

        if (!coursesData?.data.length && Object.values(params).find((param) => !!param)) {
            return <EmptyData title="Такого пока нет. Попробуете изменить запрос?" />;
        }

        if (!coursesData?.data.length) {
            return <EmptyData title="Курсов не найдено" />;
        }

        return (
            <Flex direction="column" gap={48} w="100%">
                <Grid gutter={24} m={0}>
                    {coursesData.data.map((course) => (
                        <Grid.Col {...colProps} key={course.id}>
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

    return (
        <Skeleton width="100%" height={isLoading ? 100 : "auto"} visible={isLoading}>
            {renderContent()}
        </Skeleton>
    );
};

export default memo(InfiniteList);
