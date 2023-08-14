import { Flex, FlexProps } from "@mantine/core";
import { memo } from "react";
import { Paragraph, ProgressBar } from "@shared/ui";
import { GroupFromList } from "@entities/group";
import { getCountsInfo } from "./utils";
import useStyles from "./ProgressInfo.styles";

export interface ProgressInfoProps extends Omit<FlexProps, "children"> {
    data: GroupFromList;
}

const MemoizedProgressInfo = memo(function ProgressInfo({ data, ...props }: ProgressInfoProps) {
    const { classes, cx } = useStyles();

    const { lessonsCount, practiceCount, status } = data;
    const maxValue = lessonsCount.total + practiceCount.total;
    const progressValue = lessonsCount.passed + practiceCount.passed;

    const { lessons, practice } = getCountsInfo(data, status.name);

    return (
        <Flex {...props} className={cx(classes.root, props.className)}>
            <Flex gap={8}>
                <Paragraph variant="text-small-m">{lessons}</Paragraph>
                <Paragraph variant="text-small-m">{practice}</Paragraph>
            </Flex>
            {status.name === "inProgress" && <ProgressBar value={progressValue} maxValue={maxValue} hiddenLabel h={8} w="100%" />}
        </Flex>
    );
});

export default MemoizedProgressInfo;
