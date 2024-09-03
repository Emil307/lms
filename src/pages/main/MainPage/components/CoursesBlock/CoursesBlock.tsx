import { Box, FlexProps } from "@mantine/core";
import React, { useState } from "react";
import { ArrowRight } from "react-feather";
import { useRouter } from "next/router";
import { List as CoursesList } from "@features/courses";
import { Button, Heading } from "@shared/ui";
import { useIntersection } from "@shared/utils";
import useStyles from "./CoursesBlock.styles";
import { initialParams } from "./constants";

export interface CoursesBlockProps extends FlexProps {}

const CoursesBlock = (props: CoursesBlockProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { ref: rootBlockRef, entry } = useIntersection();

    const [visibleCourses, setVisibleCourses] = useState(initialParams.countCoursesPerOpen);
    const [totalCoursesCount, setTotalCoursesCount] = useState(0);

    const handleShowMoreCourses = () => {
        setVisibleCourses((prev) => prev + initialParams.countCoursesPerOpen);
    };

    const handleOpenCoursesPage = () => router.push("/courses");

    return (
        <Box ref={rootBlockRef} maw={1320} m={"auto"}>
            <CoursesList
                colProps={{ lg: 4, md: 4, xs: 12 }}
                isPopular
                visibleCourses={visibleCourses}
                headerSlot={<Heading className={classes.title}>Курсы для карьеры и жизни</Heading>}
                footerSlot={
                    <>
                        {visibleCourses < totalCoursesCount ? (
                            <Button variant="white" w="min-content" mx="auto" onClick={handleShowMoreCourses}>
                                Еще {Math.min(initialParams.countCoursesPerOpen, totalCoursesCount - visibleCourses)} курсов
                            </Button>
                        ) : (
                            <Button variant="primary" rightIcon={<ArrowRight />} w="min-content" mx="auto" onClick={handleOpenCoursesPage}>
                                Все курсы
                            </Button>
                        )}
                    </>
                }
                skeletonListProps={{
                    mih: 258,
                    radius: 16,
                }}
                visible={!!entry?.isIntersecting}
                wrapperProps={{ direction: "column", gap: 48, ...props }}
                setTotalCoursesCount={setTotalCoursesCount}
            />
        </Box>
    );
};

export default CoursesBlock;
