import { Box, Flex, FlexProps, Skeleton, SkeletonProps } from "@mantine/core";
import { useRouter } from "next/router";
import { CourseCollectionFromList, useCourseCollections } from "@entities/courseCollection";
import { List as ListComponent, ListProps as TListProps } from "@components/List";
import { Heading, HeadingProps } from "@shared/ui";
import { adaptGetCourseCollectionsRequest, getInitialParams } from "./utils";
import { Card } from "../Card";
import { CardMore } from "../CardMore";

export interface ListProps extends Pick<TListProps<CourseCollectionFromList>, "colProps"> {
    exceptionCourseCollectionId?: string;
    hasCardMore?: boolean;
    perPage?: number;
    withPagination?: boolean;
    title?: string;
    skeletonListProps?: SkeletonProps;
    wrapperProps?: FlexProps;
    headingProps?: HeadingProps;
    visible?: boolean;
}

const List = ({
    perPage,
    hasCardMore,
    exceptionCourseCollectionId,
    title,
    wrapperProps,
    skeletonListProps,
    headingProps,
    withPagination,
    ...props
}: ListProps) => {
    const router = useRouter();
    const page = withPagination ? router.query.page || 1 : 1;

    const {
        data: courseCollectionsData,
        isFetching,
        isLoading,
    } = useCourseCollections(
        adaptGetCourseCollectionsRequest({ ...getInitialParams(perPage), page: Number(page), id: exceptionCourseCollectionId })
    );

    const handleClickCard = (id: unknown) => router.push({ pathname: "/course-collections/[id]", query: { id: String(id) } });

    const getCountSets = () => {
        if (!courseCollectionsData?.pagination.total) {
            return 0;
        }

        return courseCollectionsData.pagination.total - (perPage || 0);
    };

    const renderCardMore = () => {
        if (!hasCardMore || !courseCollectionsData?.pagination.total || courseCollectionsData.pagination.total < 2) {
            return;
        }
        return <CardMore countCardSet={getCountSets()} h="100%" mih={256} />;
    };

    if (!courseCollectionsData?.data.length) {
        return null;
    }

    return (
        <Flex direction="column" {...wrapperProps}>
            {title && (
                <Skeleton visible={isLoading} mih={40} radius={24}>
                    <Heading {...headingProps}>{title}</Heading>
                </Skeleton>
            )}
            <Box w="100%">
                <Skeleton visible={isLoading} {...skeletonListProps}>
                    <ListComponent<CourseCollectionFromList>
                        {...props}
                        data={courseCollectionsData.data}
                        renderItem={(props) => <Card {...props} />}
                        pagination={courseCollectionsData.pagination}
                        withPagination={withPagination}
                        declensionWordCountItems={["подборка", "подборки", "подборок"]}
                        isLoading={isFetching || isLoading}
                        cardMore={renderCardMore()}
                        onClick={handleClickCard}
                    />
                </Skeleton>
            </Box>
        </Flex>
    );
};

export default List;
