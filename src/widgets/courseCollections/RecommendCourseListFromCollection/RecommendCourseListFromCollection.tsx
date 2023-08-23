import { Flex, Skeleton } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, Heading, Paragraph } from "@shared/ui";
import { Card } from "@features/courses";
import { Carousel } from "@components/Carousel";
import { CourseFromList, useCoursesInfinite } from "@entities/course";
import { useRandomCourseCollection } from "@entities/courseCollection";
import { initialParamsForCollection, initialParamsForCourses } from "./constants";
import { adaptGetCoursesFromCollectionRequest } from "./utils";

const RecommendCourseListFromCollection = () => {
    const router = useRouter();

    const { data: courseCollectionData = [], isFetching: isFetchingCollection } = useRandomCourseCollection(initialParamsForCollection);

    const collection = courseCollectionData[0];

    const {
        data: courses,
        isLoading: isLoadingCourses,
        hasNextPage,
        fetchNextPage,
    } = useCoursesInfinite(
        adaptGetCoursesFromCollectionRequest({ ...initialParamsForCourses, collectionIds: String(collection?.id) }),
        !!collection
    );

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    if (isFetchingCollection || isLoadingCourses) {
        return (
            <>
                <Skeleton maw={420} h={72} radius={8} />
                <Skeleton w="100%" h={352} radius={16} />
            </>
        );
    }

    if (!collection || !courses?.data.length) {
        return null;
    }

    const handleClickAllCourseCollections = () => router.push("/course-collections");

    const handleClickCourseCard = (courseId: number) => router.push({ pathname: "/courses/[id]", query: { id: String(courseId) } });

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
