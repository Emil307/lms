import { Flex, ThemeIcon } from "@mantine/core";
import { ReactNode } from "react";
import { Heading, Paragraph } from "@shared/ui";
import { getPluralString } from "@shared/utils";
import useStyles from "./AnswerCountInfo.styles";

export interface AnswerCountInfoProps {
    data: {
        fieldName: string;
        count: number;
        description: string;
        icon: ReactNode;
    };
}

const AnswerCountInfo = ({ data }: AnswerCountInfoProps) => {
    const { classes } = useStyles({ fieldName: data.fieldName });

    return (
        <Flex className={classes.root}>
            <ThemeIcon className={classes.iconWrapper}>{data.icon}</ThemeIcon>
            <Flex direction="column" gap={2}>
                <Heading order={4}>{`${data.count} ${getPluralString(data.count, "вопрос", "вопроса", "вопросов")}`}</Heading>
                <Paragraph variant="text-caption">{data.description}</Paragraph>
            </Flex>
        </Flex>
    );
};

export default AnswerCountInfo;
