import { Box, BoxProps, Flex, FlexProps, Skeleton, SkeletonProps } from "@mantine/core";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { List as ListComponent, ListProps as TListProps } from "@components/List";
import { CourseFromList, GetCoursesResponse, useCourses } from "@entities/course";
import { EmptyData } from "@shared/ui";
import { initialParams } from "./constants";
import { adaptGetCoursesRequest } from "./utils";
import { TRouterQueries } from "./types";
import { Card } from "../Card";

export interface ListProps extends BoxProps, Pick<TListProps<CourseFromList>, "colProps" | "withPagination"> {
    collectionIds?: string;
    isFavorite?: boolean;
    isPopular?: boolean;
    headerSlot?: ReactNode | ((data: { data?: GetCoursesResponse }) => ReactNode);
    footerSlot?: ReactNode;
    skeletonListProps?: SkeletonProps;
    wrapperProps?: FlexProps;
    visible?: boolean;
    setTotalCoursesCount?: React.Dispatch<React.SetStateAction<number>>;
    visibleCourses?: number;
    perPage?: number;
}

const List = ({
    collectionIds,
    headerSlot,
    footerSlot,
    colProps = { md: 4, sm: 12 },
    isFavorite,
    isPopular,
    withPagination = false,
    skeletonListProps,
    wrapperProps,
    visible = true,
    setTotalCoursesCount,
    visibleCourses = 6,
    ...props
}: ListProps) => {
    const router = useRouter();
    const params = router.query as TRouterQueries;

    const {
        data: coursesData,
        isFetching,
        isLoading,
    } = useCourses(
        adaptGetCoursesRequest({ ...initialParams, ...params, isFavorite, isPopular, collectionIds }),
        !!visible && router.isReady
    );

    // Установка общего количества курсов
    // TODO: Тестово указал perPage как количество курсов, тк total не возвращает сразу все курсы при запросе
    useEffect(() => {
        if (coursesData?.pagination && setTotalCoursesCount) {
            setTotalCoursesCount(coursesData.pagination.perPage || 0);
        }
    }, [coursesData, setTotalCoursesCount]);

    if (!isLoading && !coursesData?.data.length && isPopular) {
        return null;
    }

    const handleClickCard = (id: unknown) => {
        const selectCourse = coursesData?.data.find((course) => String(course.id) === String(id));

        if (selectCourse?.isOwn) {
            // TODO: Добавить редирект на страницу /my-courses/[id]
        }
        router.push({ pathname: "/courses/[id]", query: { id: String(id) } });
    };

    const renderContent = () => {
        if (!isLoading && !coursesData?.data.length && !!Object.values(params).find((param) => !!param)) {
            return <EmptyData title="Такого пока нет. Попробуете изменить запрос?" />;
        }

        if (!isLoading && !coursesData?.data.length && isFavorite) {
            return <EmptyData title="У вас нет избранных курсов" description="Добавьте курсы в избранные на странице курсов или курса" />;
        }

        const visibleCoursesData = coursesData?.data.slice(0, visibleCourses);

        return (
            <Box {...props} w="100%">
                <ListComponent<CourseFromList>
                    data={visibleCoursesData}
                    renderItem={(props) => <Card {...props} buttonVariant="favorite" />}
                    colProps={colProps}
                    withPagination={withPagination}
                    pagination={coursesData?.pagination}
                    declensionWordCountItems={["курс", "курса", "курсов"]}
                    isLoading={isFetching || isLoading}
                    onClick={handleClickCard}
                />
            </Box>
        );
    };

    const renderHeader = () => {
        return typeof headerSlot === "function" ? headerSlot({ data: coursesData }) : headerSlot;
    };

    return (
        <Flex direction="column" {...wrapperProps}>
            <Skeleton visible={isLoading} radius={16}>
                {renderHeader()}
            </Skeleton>
            <Skeleton visible={isLoading} {...skeletonListProps}>
                {renderContent()}
            </Skeleton>
            <Skeleton visible={isLoading} radius={16} sx={{ display: "flex" }}>
                {footerSlot}
            </Skeleton>
        </Flex>
    );
};

export default List;
