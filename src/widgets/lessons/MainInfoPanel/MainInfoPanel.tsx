import { Badge, Flex, FlexProps, Box } from "@mantine/core";
import { Heading, Paragraph } from "@shared/ui";
import { GetLessonResponse } from "@entities/lesson";
import { MyCourse } from "@entities/course";
import { FinishLessonButton } from "@features/lessons";
import { NeighboringLessons } from "./components";
import useStyles from "./MainInfoPanel.styles";

export interface MainInfoPanelProps extends Omit<FlexProps, "children"> {
    data: GetLessonResponse;
    myCourseData: MyCourse;
}

const MainInfoPanel = ({ data, myCourseData, ...props }: MainInfoPanelProps) => {
    const { classes } = useStyles({
        status: data.lessonStatus.name,
        testStatus: data.testStatus?.name,
        homeworkStatus: data.homeworkStatus?.name,
    });

    const isVisibleFinishLessonButton = !data.homeworkRequired && !data.testExists && data.lessonStatus.name !== "completed";

    const renderTestAndHomeworkData = () => {
        if (!data.testExists && !data.homeworkExists) {
            return null;
        }
        return (
            <Flex className={classes.testAndHomeworkInfo}>
                {data.testExists && (
                    <Flex className={classes.testInfo}>
                        <Paragraph variant="small-semi">Тест:</Paragraph>
                        <Paragraph variant="small-m" className={classes.testStatus}>
                            {data.testStatus?.displayName || "Не выполнено"}
                        </Paragraph>
                    </Flex>
                )}
                {data.homeworkExists && (
                    <Flex className={classes.homeworkInfo}>
                        <Paragraph variant="small-semi">Домашнее задание:</Paragraph>
                        <Paragraph variant="small-m" className={classes.homeworkStatus}>
                            {data.homeworkStatus?.displayName || "Не выполнено"}
                        </Paragraph>
                    </Flex>
                )}
            </Flex>
        );
    };

    return (
        <Flex {...props} className={classes.root}>
            <Flex className={classes.inner}>
                <Flex direction="column" gap={16}>
                    <Badge className={classes.status}>{data.lessonStatus.displayName}</Badge>
                    <Box>
                        <Paragraph variant="text-small-m">{myCourseData.name}</Paragraph>
                        <Heading>{data.name}</Heading>
                    </Box>
                    <Paragraph variant="small-m" color="neutralMain50">
                        {data.description}
                    </Paragraph>
                    {renderTestAndHomeworkData()}
                </Flex>
                {myCourseData.status.name !== "completed" && (
                    <FinishLessonButton
                        courseId={String(myCourseData.courseId)}
                        lessonId={String(data.id)}
                        visible={isVisibleFinishLessonButton}
                        nameLesson={data.name}
                        w="100%"
                        maw={170}
                    />
                )}
            </Flex>

            <NeighboringLessons prevLesson={data.prevLesson} nextLesson={data.nextLesson} />
        </Flex>
    );
};

export default MainInfoPanel;
