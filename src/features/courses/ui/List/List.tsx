import { Box, BoxProps, Flex, FlexProps, Skeleton, SkeletonProps } from "@mantine/core";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { List as ListComponent, ListProps as TListProps } from "@components/List";
import { Course, useCourses } from "@entities/course";
import { EmptyData } from "@shared/ui";
import { initialParams } from "./constants";
import { adaptGetCoursesRequest } from "./utils";
import { TRouterQueries } from "./types";
import { Card } from "../Card";

export interface ListProps extends BoxProps, Pick<TListProps<Course>, "colProps" | "withPagination"> {
    collectionIds?: string;
    perPage?: number;
    headerSlot?: ReactNode;
    footerSlot?: ReactNode;
    skeletonListProps?: SkeletonProps;
    wrapperProps?: FlexProps;
    visible?: boolean;
}

const List = ({
    collectionIds,
    headerSlot,
    footerSlot,
    colProps = { md: 4, sm: 6 },
    perPage = 6,
    withPagination = false,
    skeletonListProps,
    wrapperProps,
    visible,
    ...props
}: ListProps) => {
    const router = useRouter();
    const params = router.query as TRouterQueries;

    const {
        data: coursesData,
        isFetching,
        isLoading,
    } = useCourses(adaptGetCoursesRequest({ ...initialParams, ...params, perPage, collectionIds }), visible);

    const handleClickCard = (id: unknown) => router.push({ pathname: "/courses/[id]", query: { id: String(id) } });

    const renderContent = () => {
        if (!isLoading && !coursesData?.data.length && !!Object.values(params).find((param) => !!param)) {
            return <EmptyData title="Такого пока нет. Попробуете изменить запрос?" />;
        }

        return (
            <Box {...props} w="100%">
                <ListComponent<Course>
                    data={coursesData?.data}
                    renderItem={(props) => <Card {...props} />}
                    colProps={colProps}
                    withPagination={withPagination}
                    pagination={coursesData?.pagination}
                    declensionWordCountItems={["курс", "курса", "курсов"]}
                    isLoading={isFetching}
                    onClick={handleClickCard}
                />
            </Box>
        );
    };

    return (
        <Flex direction="column" {...wrapperProps}>
            <Skeleton visible={isLoading} radius={16}>
                {headerSlot}
            </Skeleton>
            <Skeleton visible={isLoading} {...skeletonListProps}>
                {renderContent()}
            </Skeleton>
            <Skeleton visible={isLoading} radius={16}>
                {footerSlot}
            </Skeleton>
        </Flex>
    );
};

export default List;
