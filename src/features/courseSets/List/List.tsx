import { Box, Flex, FlexProps, Skeleton, SkeletonProps, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { CourseSet, useCourseSets } from "@entities/courseSet";
import { List as ListComponent, ListProps as TListProps } from "@components/List";
import { adaptGetCourseSetsRequest, getInitialParams } from "./utils";
import { Card } from "../Card";
import { CardMore } from "../CardMore";

export interface ListProps extends Pick<TListProps<CourseSet>, "colProps"> {
    exceptionCourseSetId?: string;
    hasCardMore?: boolean;
    perPage?: number;
    withPagination?: boolean;
    title?: string;
    skeletonListProps?: SkeletonProps;
    wrapperProps?: FlexProps;
    visible?: boolean;
}

const List = ({ perPage, hasCardMore, exceptionCourseSetId, title, wrapperProps, skeletonListProps, ...props }: ListProps) => {
    const router = useRouter();
    const page = router.query.page || 1;

    const {
        data: courseSetsData,
        isFetching,
        isLoading,
    } = useCourseSets(adaptGetCourseSetsRequest({ ...getInitialParams(perPage), page: Number(page), exceptionCourseSetId }));

    const getCountSets = () => {
        if (!courseSetsData?.pagination.total) {
            return 0;
        }

        return courseSetsData.pagination.total - (perPage || 0);
    };

    const renderCardMore = () => {
        if (!hasCardMore || !courseSetsData?.pagination.total || courseSetsData.pagination.total < 2) {
            return;
        }
        return <CardMore countCardSet={getCountSets()} h={256} />;
    };

    if (!courseSetsData?.data.length) {
        return null;
    }

    return (
        <Flex {...wrapperProps}>
            {title && (
                <Skeleton visible={isLoading} mih={40} radius={24}>
                    <Title order={1} color="dark">
                        {title}
                    </Title>
                </Skeleton>
            )}

            <Box>
                <Skeleton visible={isLoading} {...skeletonListProps}>
                    <ListComponent<CourseSet>
                        {...props}
                        data={courseSetsData.data}
                        renderItem={(props) => <Card {...props} />}
                        pagination={courseSetsData.pagination}
                        declensionWordCountItems={["подборка", "подборки", "подборок"]}
                        isLoading={isFetching || isLoading}
                        cardMore={renderCardMore()}
                    />
                </Skeleton>
            </Box>
        </Flex>
    );
};

export default List;
