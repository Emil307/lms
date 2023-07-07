import { Flex, Text } from "@mantine/core";
import { CourseBlock } from "@entities/course";
import { getPluralString } from "@shared/utils";
import useStyles from "./ProgramInfo.styles";

export interface ProgramInfoProps {
    data: Pick<CourseBlock, "lessons" | "practice">;
}

const ProgramInfo = ({ data: { lessons, practice } }: ProgramInfoProps) => {
    const { classes } = useStyles();
    return (
        <Flex gap={8}>
            <Text className={classes.lessonCount}>{`${lessons.total} ${getPluralString(lessons.total, "урок", "урока", "уроков")}`}</Text>
            <Text className={classes.practiceCount}>{`${practice.total} ${getPluralString(
                practice.total,
                "урок",
                "урока",
                "уроков",
            )}`}</Text>
        </Flex>
    );
};

export default ProgramInfo;
