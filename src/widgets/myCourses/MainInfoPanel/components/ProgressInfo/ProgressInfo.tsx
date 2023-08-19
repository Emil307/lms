import { Flex } from "@mantine/core";
import { Paragraph, ProgressBar } from "@shared/ui";
import { getPluralString } from "@shared/utils";
import { GetGroupResponse } from "@entities/group";
import useStyles from "./ProgressInfo.styles";

export interface ProgressInfoProps {
    data: GetGroupResponse;
}

const ProgressInfo = ({ data }: ProgressInfoProps) => {
    const { classes } = useStyles();
    const { lessonsCount, practiceCount } = data;

    const maxValue = lessonsCount.total + practiceCount.total;
    const progressValue = lessonsCount.passed + practiceCount.passed;

    switch (data.status.name) {
        case "completed":
        case "notStarted":
            return (
                <Flex className={classes.contentText}>
                    <Paragraph variant="small-m" className={classes.text}>{`${lessonsCount.total} ${getPluralString(
                        lessonsCount.total,
                        "урок",
                        "урока",
                        "уроков"
                    )}`}</Paragraph>
                    <Paragraph variant="small-m" className={classes.text}>{`${practiceCount.total} ${getPluralString(
                        practiceCount.total,
                        "практическое задание",
                        "практического задания",
                        "практических заданий"
                    )}`}</Paragraph>
                </Flex>
            );

        case "inProgress":
            return (
                <Flex className={classes.rootProgress}>
                    <Flex className={classes.contentText}>
                        <Paragraph variant="small-m" className={classes.text}>{`${lessonsCount.passed}/${
                            lessonsCount.total
                        } ${getPluralString(lessonsCount.total, "урок", "урока", "уроков")}`}</Paragraph>
                        <Paragraph variant="small-m" className={classes.text}>{`${practiceCount.passed}/${
                            practiceCount.total
                        } ${getPluralString(
                            practiceCount.total,
                            "практическое задание",
                            "практического задания",
                            "практических заданий"
                        )}`}</Paragraph>
                    </Flex>
                    <ProgressBar value={progressValue} maxValue={maxValue} hiddenLabel h={8} />
                </Flex>
            );

        default:
            return null;
    }
};

export default ProgressInfo;
