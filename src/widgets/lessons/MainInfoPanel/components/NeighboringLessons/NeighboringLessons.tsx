import { GetLessonResponse } from "@entities/lesson";
import { useRouter } from "next/router";
import { Box, Flex } from "@mantine/core";
import { Button } from "@shared/ui";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";

interface NeighboringLessonsProps extends Pick<GetLessonResponse, "prevLesson" | "nextLesson"> {}

const NeighboringLessons = ({ prevLesson, nextLesson }: NeighboringLessonsProps) => {
    const router = useRouter();

    const openLessonDetail = (lessonId: string) => {
        router.push({
            pathname: "/my-courses/[id]/lessons/[lessonId]",
            query: { id: String(router.query.id), lessonId: lessonId },
        });
    };

    const handlePreviousLesson = () => openLessonDetail(String(prevLesson?.id));
    const handleNextLesson = () => openLessonDetail(String(nextLesson?.id));

    const renderNeighboringLessons = () => {
        if (!prevLesson && !nextLesson) {
            return null;
        }
        return (
            <Flex justify="space-between">
                <Box>
                    {prevLesson && (
                        <Button
                            variant="text"
                            leftIcon={<ArrowLeftCircle />}
                            onClick={handlePreviousLesson}
                            disabled={!prevLesson.isAvailable}>
                            {prevLesson.name}
                        </Button>
                    )}
                </Box>
                <Box>
                    {nextLesson && (
                        <Button
                            variant="text"
                            rightIcon={<ArrowRightCircle />}
                            onClick={handleNextLesson}
                            disabled={!nextLesson.isAvailable}>
                            {nextLesson.name}
                        </Button>
                    )}
                </Box>
            </Flex>
        );
    };

    return renderNeighboringLessons();
};

export default NeighboringLessons;
