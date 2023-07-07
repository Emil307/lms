import { Flex, Text } from "@mantine/core";
import { memo } from "react";
import { ProgressBar } from "@shared/ui";
import { CourseBlock } from "@entities/course";
import { getPluralString } from "@shared/utils";
import useStyles from "./ProgressInfo.styles";

export interface ProgressInfoProps {
    data: Pick<CourseBlock, "lessons" | "practice" | "onProgress">;
}

const MemoizedProgressInfo = memo(function Footer({ data }: ProgressInfoProps) {
    const { lessons, practice } = data;
    const { classes } = useStyles();
    if (data.onProgress) {
        const maxValue = lessons.total + practice.total;
        const progressValue = lessons.passed + practice.passed;

        return (
            <>
                <Flex gap={8} mb={16}>
                    <Text className={classes.lessonCount}>{`${lessons.passed}/${lessons.total} ${getPluralString(
                        lessons.total,
                        "урок",
                        "урока",
                        "уроков",
                    )}`}</Text>
                    <Text className={classes.practiceCount}>{`${practice.passed}/${practice.total} ${getPluralString(
                        practice.total,
                        "практика",
                        "практики",
                        "практик",
                    )}`}</Text>
                </Flex>
                <ProgressBar value={progressValue} maxValue={maxValue} hiddenLabel h={8} />
            </>
        );
    }

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
});

export default MemoizedProgressInfo;
