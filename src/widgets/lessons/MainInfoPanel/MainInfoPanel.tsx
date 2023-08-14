import { Badge, Flex, FlexProps } from "@mantine/core";
import { Box } from "@mantine/core";
import { Button, Heading, Paragraph } from "@shared/ui";
import { GetLessonResponse } from "@entities/lesson";
import { MyCourse } from "@entities/course";
import useStyles from "./MainInfoPanel.styles";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import { useRouter } from "next/router";

export interface MainInfoPanelProps extends Omit<FlexProps, "children"> {
    data: GetLessonResponse;
    myCourseData: MyCourse;
}

const MainInfoPanel = ({ data, myCourseData, ...props }: MainInfoPanelProps) => {
    const { classes } = useStyles({ status: data.lessonStatus.name });
    const router = useRouter();

    const handleNextLesson = () => {
        router.push({
            pathname: "/my-courses/[id]/lessons/[lessonId]",
            query: { id: String(router.query.id), lessonId: String(data.nextLesson?.id) },
        });
    };

    const handlePreviousLesson = () => {
        router.push({
            pathname: "/my-courses/[id]/lessons/[lessonId]",
            query: { id: String(router.query.id), lessonId: String(data.prevLesson?.id) },
        });
    };

    const renderNeighboringLessons = () => {
        if (!data.prevLesson && !data.nextLesson) {
            return null;
        }
        return (
            <Flex justify="space-between">
                <Box>
                    {data.prevLesson && (
                        <Button
                            variant="text"
                            leftIcon={<ArrowLeftCircle />}
                            onClick={handlePreviousLesson}
                            disabled={!data.prevLesson.isAvailable}>
                            {data.prevLesson.name}
                        </Button>
                    )}
                </Box>
                <Box>
                    {data.nextLesson && (
                        <Button
                            variant="text"
                            rightIcon={<ArrowRightCircle />}
                            onClick={handleNextLesson}
                            disabled={!data.nextLesson.isAvailable}>
                            {data.nextLesson.name}
                        </Button>
                    )}
                </Box>
            </Flex>
        );
    };

    return (
        <Flex {...props} className={classes.root}>
            <Flex direction="column" gap={16}>
                <Badge className={classes.status}>{data.lessonStatus.displayName}</Badge>
                <Box>
                    <Paragraph variant="text-small-m">{myCourseData.name}</Paragraph>
                    <Heading>{data.name}</Heading>
                </Box>
                <Paragraph variant="small-m" color="gray45">
                    {data.description}
                </Paragraph>
                <Flex gap={16}>
                    <Flex gap={6}>
                        <Paragraph variant="small-semi">Тест:</Paragraph>
                        <Paragraph variant="small-m">{data.testStatus.displayName}</Paragraph>
                    </Flex>
                    <Flex gap={6}>
                        <Paragraph variant="small-semi">
                            <Flex gap={6}>
                                <Paragraph variant="small-semi">Домашнее задание:</Paragraph>
                                <Paragraph variant="small-m">{data.homeworkStatus.displayName}</Paragraph>
                            </Flex>
                        </Paragraph>
                    </Flex>
                </Flex>
            </Flex>
            {renderNeighboringLessons()}
        </Flex>
    );
};

export default MainInfoPanel;
