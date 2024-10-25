import { Flex, Skeleton } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, Heading, Paragraph } from "@shared/ui";
import { Card } from "@features/courses";
import { Carousel } from "@components/Carousel";
import { CourseFromList, useCoursesInfinite } from "@entities/course";
import { useRandomCourseCollection } from "@entities/courseCollection";
import { useIntersection } from "@shared/utils";
import { adaptGetCoursesFromCollectionRequest } from "./utils";
import { initialParamsForCourses } from "./constants";

const RecommendCourseListFromCollection = () => {
    const router = useRouter();

    const { data: courseCollection, isFetching: isFetchingCollection } = useRandomCourseCollection();

    const {
        data: courses,
        isLoading: isLoadingCourses,
        hasNextPage,
        fetchNextPage,
    } = useCoursesInfinite(
        adaptGetCoursesFromCollectionRequest({ ...initialParamsForCourses, collectionIds: String(courseCollection?.id) }),
        !!courseCollection,
    );

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    if (isFetchingCollection || (courseCollection && isLoadingCourses)) {
        return (
            <>
                <Skeleton maw={420} h={72} radius={8} />
                <Skeleton w="100%" h={352} radius={16} />
            </>
        );
    }

    if (!courseCollection || !courses?.data.length) {
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
                <Paragraph variant="large" color="neutralGray300">
                    {courseCollection.name}
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
