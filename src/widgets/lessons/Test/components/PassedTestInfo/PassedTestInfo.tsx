import { Flex, FlexProps } from "@mantine/core";
import { GetTestPassResponse } from "@entities/lesson";
import { Heading } from "@shared/ui";
import useStyles from "./PassedTestInfo.styles";
import { answerCounts } from "./constants";
import { AnswerCountInfo, Footer } from "./components";

export interface PassedTestInfoProps extends Omit<FlexProps, "children"> {
    data: GetTestPassResponse;
    openUpdateTestPassForm: () => void;
}

const PassedTestInfo = ({ data, openUpdateTestPassForm, ...props }: PassedTestInfoProps) => {
    const { classes, cx } = useStyles();

    const renderTestPassInfoList = () =>
        answerCounts.map((answerCount) => (
            <AnswerCountInfo
                key={answerCount.id}
                data={{ ...answerCount, count: Number(data[answerCount.fieldName as keyof GetTestPassResponse]) }}
            />
        ));

    return (
        <Flex {...props} className={cx(classes.root, props.className)}>
            <Flex className={classes.heading}>
                <Heading order={3}>Тестирование завершено</Heading>
                <Flex gap={56}>{renderTestPassInfoList()}</Flex>
            </Flex>
            <Footer data={data} openUpdateTestPassForm={openUpdateTestPassForm} />
        </Flex>
    );
};

export default PassedTestInfo;
