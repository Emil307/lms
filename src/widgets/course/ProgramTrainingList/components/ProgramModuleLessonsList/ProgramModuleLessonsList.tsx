import { Flex, List as MList, ListProps as MListProps } from "@mantine/core";
import { CourseModuleLesson } from "@entities/course";
import { Paragraph } from "@shared/ui";
import useStyles from "./ProgramModuleLessonsList.styles";

export interface ProgramModuleLessonsListProps extends Omit<MListProps, "children"> {
    data: CourseModuleLesson[];
}

const ProgramModuleLessonsList = ({ data, ...props }: ProgramModuleLessonsListProps) => {
    const { classes } = useStyles();

    const renderTaskTypes = (lesson: CourseModuleLesson) => {
        if (!lesson.hasHomework && !lesson.hasTest) {
            return null;
        }

        return (
            <Flex gap={10}>
                {lesson.hasHomework && (
                    <Paragraph variant="text-small-m" color="gray45">
                        Домашнее задание
                    </Paragraph>
                )}
                {lesson.hasTest && (
                    <Paragraph variant="text-small-m" color="gray45">
                        Тестирование
                    </Paragraph>
                )}
            </Flex>
        );
    };

    if (!data.length) {
        return null;
    }

    return (
        <MList type="ordered" {...props}>
            {data.map((lesson) => (
                <MList.Item key={lesson.name} className={classes.listItem}>
                    <Paragraph variant="text-small-m">{lesson.name}</Paragraph>
                    {renderTaskTypes(lesson)}
                </MList.Item>
            ))}
        </MList>
    );
};

export default ProgramModuleLessonsList;
