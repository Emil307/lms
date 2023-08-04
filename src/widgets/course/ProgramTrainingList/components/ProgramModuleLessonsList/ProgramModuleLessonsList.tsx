import { List as MList, ListProps as MListProps } from "@mantine/core";
import { CourseModuleLesson } from "@entities/course";
import { Paragraph } from "@shared/ui";

export interface ProgramModuleLessonsListProps extends Omit<MListProps, "children"> {
    data: CourseModuleLesson[];
}

const ProgramModuleLessonsList = ({ data, ...props }: ProgramModuleLessonsListProps) => {
    if (!data.length) {
        return null;
    }

    return (
        <MList type="ordered" {...props}>
            {data.map((lesson) => (
                <MList.Item key={lesson.name}>
                    <Paragraph variant="text-small-m">{lesson.name}</Paragraph>
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
                </MList.Item>
            ))}
        </MList>
    );
};

export default ProgramModuleLessonsList;
