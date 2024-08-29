import React from "react";
import { Flex, FlexProps, Skeleton, SkeletonProps, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { CourseCollectionFromList, useCourseCollections } from "@entities/courseCollection";
import { ListProps as TListProps } from "@components/List";
import { Heading, HeadingProps } from "@shared/ui";
import { adaptGetCourseCollectionsRequest, getInitialParams } from "./utils";
import { Card } from "../Card";
import useStyles from "./List.styles";
import { Carousel } from "@components/Carousel";

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

const List = ({ perPage, exceptionCourseCollectionId, wrapperProps, withPagination }: ListProps) => {
    const router = useRouter();
    const page = withPagination ? router.query.page || 1 : 1;
    const { classes } = useStyles();

    const { data: courseCollectionsData, isLoading } = useCourseCollections(
        adaptGetCourseCollectionsRequest({ ...getInitialParams(perPage), page: Number(page), id: exceptionCourseCollectionId })
    );
    if (!courseCollectionsData?.data.length) {
        return null;
    }

    return (
        <Flex direction="column" {...wrapperProps}>
            <Skeleton visible={isLoading} mih={40} radius={24}>
                <Heading mb={24}>
                    <Flex direction={"column"} gap={24}>
                        <Text ta={"center"} className={classes.title}>
                            Больше знаний в комплексе
                        </Text>
                        <Text ta={"center"} className={classes.description}>
                            Расширяйте кругозор и получайте удовольствие <br /> от новых знаний с нашими наборами курсов.
                        </Text>
                    </Flex>
                </Heading>
            </Skeleton>
            <Skeleton visible={isLoading} mih={410} radius={24}>
                <Carousel<CourseCollectionFromList>
                    data={courseCollectionsData.data}
                    slideSize="25%"
                    breakpoints={[
                        { maxWidth: "md", slideSize: "50%" },
                        { maxWidth: "xs", slideSize: "100%" },
                    ]}
                    loop
                    align="center">
                    {(props) => <Card {...props} />}
                </Carousel>
            </Skeleton>
        </Flex>
    );
};

export default List;
