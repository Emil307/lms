import { Flex, List as MList, ListProps as MListProps } from "@mantine/core";
import React from "react";
import { CourseModuleLesson } from "@entities/course";
import { Paragraph } from "@shared/ui";
import useStyles from "./ProgramModuleLessonsList.styles";

export interface ProgramModuleLessonsListProps extends Omit<MListProps, "children"> {
    data: CourseModuleLesson[];
}

const ProgramModuleLessonsList = ({ data, ...props }: ProgramModuleLessonsListProps) => {
    const { classes } = useStyles();

    if (!data.length) {
        return null;
    }

    return (
        <MList type="ordered" {...props} w="100%">
            <Flex direction="column" gap={8}>
                {data.map((lesson, index) => (
                    <Flex key={lesson.name} gap={16} className={classes.listItem}>
                        <Paragraph variant="text-small-m" color="gray45">
                            Урок {index + 1}
                        </Paragraph>
                        <Paragraph variant="text-small-m">{lesson.name}</Paragraph>
                    </Flex>
                ))}
            </Flex>
        </MList>
    );
};

export default ProgramModuleLessonsList;
