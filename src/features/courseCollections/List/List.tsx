import React, { useEffect, useState } from "react";
import { Flex, FlexProps, Skeleton, SkeletonProps, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { CourseCollectionFromList, useCourseCollections } from "@entities/courseCollection";
import { ListProps as TListProps } from "@components/List";
import { Heading, HeadingProps } from "@shared/ui";
import { adaptGetCourseCollectionsRequest, getInitialParams } from "./utils";
import { Card } from "../Card";
import useStyles from "./List.styles";
import { Carousel } from "@components/Carousel";
import { EmblaCarouselType } from "embla-carousel-react";

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
    const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);
    const [_activeIndex, setActiveIndex] = useState(0);
    const page = withPagination ? router.query.page || 1 : 1;
    const { classes } = useStyles();

    const { data: courseCollectionsData, isLoading } = useCourseCollections(
        adaptGetCourseCollectionsRequest({ ...getInitialParams(perPage), page: Number(page), id: exceptionCourseCollectionId })
    );

    useEffect(() => {
        if (!emblaApi) return;

        const handleSelect = () => {
            setActiveIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", handleSelect);
        handleSelect();

        return () => {
            emblaApi.off("select", handleSelect);
        };
    }, [emblaApi]);

    if (!courseCollectionsData?.data.length) {
        return null;
    }

    return (
        <Flex direction="column" {...wrapperProps} className={classes.wrapper}>
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
                        { maxWidth: "xs", slideSize: "80%" },
                    ]}
                    getEmblaApi={setEmblaApi}
                    emblaApi={emblaApi}
                    align="center"
                    customStyles={useStyles}>
                    {(props) => <Card {...props} />}
                </Carousel>
            </Skeleton>
        </Flex>
    );
};

export default List;
