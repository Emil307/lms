import { Flex, FlexProps } from "@mantine/core";
import { Paragraph, ProgressBar } from "@shared/ui";
import { getPluralString } from "@shared/utils";
import { GetGroupResponse } from "@entities/group";

export interface ProgressInfoProps extends Omit<FlexProps, "children"> {
    data: GetGroupResponse;
}

const ProgressInfo = ({ data, ...props }: ProgressInfoProps) => {
    const { lessonsCount, practiceCount } = data;

    const maxValue = lessonsCount.total + practiceCount.total;
    const progressValue = lessonsCount.passed + practiceCount.passed;

    switch (data.status.name) {
        case "completed":
        case "notStarted":
            return (
                <Flex gap={8} {...props}>
                    <Paragraph variant="small-m">{`${lessonsCount.total} ${getPluralString(
                        lessonsCount.total,
                        "урок",
                        "урока",
                        "уроков"
                    )}`}</Paragraph>
                    <Paragraph variant="small-m">{`${practiceCount.total} ${getPluralString(
                        practiceCount.total,
                        "практическое задание",
                        "практического задания",
                        "практических заданий"
                    )}`}</Paragraph>
                </Flex>
            );

        case "inProgress":
            return (
                <Flex {...props} direction="column">
                    <Flex gap={8} mb={16}>
                        <Paragraph variant="small-m">{`${lessonsCount.passed}/${lessonsCount.total} ${getPluralString(
                            lessonsCount.total,
                            "урок",
                            "урока",
                            "уроков"
                        )}`}</Paragraph>
                        <Paragraph variant="small-m">{`${practiceCount.passed}/${practiceCount.total} ${getPluralString(
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
