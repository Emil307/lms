import { Flex, Card as MCard, CardProps as MCardProps } from "@mantine/core";
import { memo } from "react";
import { Paragraph, ProgressBar } from "@shared/ui";
import { GroupFromList } from "@entities/group";
import { getCountsInfo } from "./utils";

export interface ProgressInfoProps extends Omit<MCardProps, "children"> {
    data: GroupFromList;
}

const MemoizedProgressInfo = memo(function ProgressInfo({ data, ...props }: ProgressInfoProps) {
    const { lessonsCount, practiceCount, status } = data;
    const maxValue = lessonsCount.total + practiceCount.total;
    const progressValue = lessonsCount.passed + practiceCount.passed;

    const { lessons, practice } = getCountsInfo(data, status.name);

    return (
        <MCard.Section {...props} m={0}>
            <Flex gap={8}>
                <Paragraph variant="text-small-m">{lessons}</Paragraph>
                <Paragraph variant="text-small-m">{practice}</Paragraph>
            </Flex>
            {status.name === "inProgress" && <ProgressBar value={progressValue} maxValue={maxValue} hiddenLabel h={8} />}
        </MCard.Section>
    );
});

export default MemoizedProgressInfo;
