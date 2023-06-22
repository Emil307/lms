import { List as MList, ListProps as MListProps, Text } from "@mantine/core";
import { useCourseProgramModuleLessons } from "@entities/course";
import { Loader } from "@shared/ui";
import useStyles from "./ProgramModuleLessonsList.styles";

export interface ProgramModuleLessonsListProps extends Omit<MListProps, "children"> {
    courseId: number;
    programId: number;
}

const ProgramModuleLessonsList = ({ courseId, programId, ...props }: ProgramModuleLessonsListProps) => {
    const { classes } = useStyles();

    const { data: dataLessons, isLoading } = useCourseProgramModuleLessons({ courseId, programId });

    if (isLoading) {
        return <Loader />;
    }

    return (
        <MList type="ordered" {...props}>
            {dataLessons?.data.map((lesson) => (
                <MList.Item key={lesson.name}>
                    <Text className={classes.lessonName}>{lesson.name}</Text>
                    {lesson.hasHomework && <Text className={classes.lessonHomework}>Домашнее задание</Text>}
                    {lesson.hasTest && <Text className={classes.lessonTest}>Тестирование</Text>}
                </MList.Item>
            ))}
        </MList>
    );
};

export default ProgramModuleLessonsList;
