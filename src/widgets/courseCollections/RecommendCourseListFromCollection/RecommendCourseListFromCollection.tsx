import { Flex, Skeleton } from "@mantine/core";
import { Button, Heading, Paragraph } from "@shared/ui";
import { Card } from "@features/courses";
import { Carousel } from "@components/Carousel";
import { CourseFromList, useCoursesInfinite } from "@entities/course";
import { initialParams } from "./constants";
import { useCourseCollections } from "@entities/courseCollection";
import { useIntersection } from "@mantine/hooks";
import { useEffect } from "react";
import { adaptGetCoursesFromCollectionRequest } from "./utils";
import { useRouter } from "next/router";

const RecommendCourseListFromCollection = () => {
    const router = useRouter();
    //TODO Добавить в запрос random: true, когда поправит бэк
    const { data: courseCollectionData, isFetching: isFetchingCollection } = useCourseCollections({ perPage: 1, page: 1 });

    const courseCollection = courseCollectionData?.data[0];

    const {
        data: courses,
        isFetching: isFetchingCourses,
        hasNextPage,
        fetchNextPage,
    } = useCoursesInfinite(
        adaptGetCoursesFromCollectionRequest({ ...initialParams, collectionIds: String(courseCollection?.id) }),
        !!courseCollection
    );

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    if (isFetchingCollection || isFetchingCourses) {
        return (
            <>
                <Skeleton maw={420} h={72} radius={8} />
                <Skeleton w="100%" h={352} radius={16} />
            </>
        );
    }

    if (!courseCollectionData?.data.length || !courses?.data.length) {
        return null;
    }

    const handleClickAllCourseCollections = () => router.push("/course-collections");

    const handleClickCourseCard = (courseId: number) => router.push({ pathname: "/courses/[id]", query: { id: String(courseId) } });

    //TODO Убрать, когда поправит бэк в запросе random: true
    const collection = courseCollectionData.data[0];

    return (
        <Flex gap={32} direction="column">
            <Flex gap={8} direction="column">
                <Flex gap={24}>
                    <Heading order={1}>Рекомендуем изучить</Heading>
                    <Button variant="white" size="small" onClick={handleClickAllCourseCollections}>
                        Все
                    </Button>
                </Flex>
                <Paragraph variant="large" color="neutral_gray">
                    {collection.name}
                </Paragraph>
            </Flex>
            <Carousel<CourseFromList>
                data={courses.data}
                lastElemRef={lastElemRef}
                slideSize={448}
                breakpoints={[{ maxWidth: "xs", slideSize: "100%" }]}>
                {(props) => <Card data={props.data} buttonVariant="more" onClick={handleClickCourseCard} />}
            </Carousel>
        </Flex>
    );
};

export default RecommendCourseListFromCollection;
