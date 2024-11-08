import React, { useEffect, useState } from "react";
import { Flex, FlexProps, Skeleton, SkeletonProps, Group } from "@mantine/core";
import { useRouter } from "next/router";
import { EmblaCarouselType } from "embla-carousel-react";
import Link from "next/link";
import { CourseCollectionFromList, useCourseCollectionsPaginate } from "@entities/courseCollection";
import { ListProps as TListProps } from "@components/List";
import { Heading, HeadingProps, Button } from "@shared/ui";
import { Carousel } from "@components/Carousel";
import { adaptGetCourseCollectionsRequest, getInitialParams } from "./utils";
import useStyles from "./List.styles";
import { Card } from "../Card";

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
    const [, setActiveIndex] = useState(0);
    const page = withPagination ? router.query.page || 1 : 1;
    const { classes } = useStyles();

    const { data: courseCollectionsData, isLoading } = useCourseCollectionsPaginate(
        adaptGetCourseCollectionsRequest({ ...getInitialParams(perPage), page: Number(page), id: exceptionCourseCollectionId }),
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
                <Flex direction="column" gap={24} align="center">
                    <Heading className={classes.title} order={1} ta="center" color="dark">
                        Больше знаний в комплексе
                    </Heading>
                    <Heading order={3} ta="center" color="neutralMain50" maw={500}>
                        Расширяйте кругозор и получайте удовольствие от новых знаний с нашими наборами курсов
                    </Heading>
                </Flex>
            </Skeleton>
            <Skeleton visible={isLoading} mih={410} radius={24}>
                <Flex direction="column" align="center" gap={48}>
                    <Carousel<CourseCollectionFromList>
                        data={courseCollectionsData.data}
                        slideSize="448px"
                        slideGap={24}
                        breakpoints={[
                            { maxWidth: "sm", slideSize: "448px" },
                            { maxWidth: "xs", slideSize: "356px" },
                        ]}
                        getEmblaApi={setEmblaApi}
                        emblaApi={emblaApi}
                        initialSlide={Math.min(courseCollectionsData.data.length, 2)}
                        align="center"
                        customStyles={useStyles}>
                        {(props) => <Card {...props} />}
                    </Carousel>
                    <Group>
                        <Button component={Link} href="/course-collections" variant="border" size="large">
                            Все подборки
                        </Button>
                    </Group>
                </Flex>
            </Skeleton>
        </Flex>
    );
};

export default List;
