import { Flex, Box } from "@mantine/core";
import React from "react";
import dayjs from "dayjs";
import { Heading, Paragraph } from "@shared/ui";
import { AdminHomeworkAnswer } from "@entities/lesson";
import useStyles from "./HomeworkInfoPanel.styles";

interface HomeworkInfoPanelProps {
    homeworkAnswer: AdminHomeworkAnswer;
    studentFio: string;
}

const HomeworkInfoPanel = ({ homeworkAnswer, studentFio }: HomeworkInfoPanelProps) => {
    const { classes } = useStyles({ status: homeworkAnswer.status?.name });

    const getStatusName = () => {
        switch (homeworkAnswer.status?.name) {
            case "onReview":
                return "Проверка";
            case "needsEdit":
                return "Доработка";
            default:
                return null;
        }
    };

    return (
        <>
            <Heading>{studentFio}</Heading>
            <Flex className={classes.infoPanel}>
                {homeworkAnswer.status?.name !== "completed" && (
                    <Flex className={classes.item}>
                        <Paragraph variant="text-small-m" color="neutralMain50">
                            Статус:
                        </Paragraph>
                        <Box className={classes.status}>
                            <Paragraph variant="text-small-m">{getStatusName()}</Paragraph>
                        </Box>
                    </Flex>
                )}
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="neutralMain50">
                        Обязательность:
                    </Paragraph>
                    <Paragraph variant="text-small-m">{homeworkAnswer.homework.requiredType === "required" ? "Да" : "Нет"}</Paragraph>
                </Flex>
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="neutralMain50">
                        Группа:
                    </Paragraph>
                    <Paragraph variant="text-small-m">{homeworkAnswer.group.name}</Paragraph>
                </Flex>
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="neutralMain50">
                        Учебный курс:
                    </Paragraph>
                    <Paragraph variant="text-small-m">{homeworkAnswer.course.name}</Paragraph>
                </Flex>
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="neutralMain50">
                        Дата выполнения:
                    </Paragraph>
                    <Paragraph variant="text-small-m">{dayjs(homeworkAnswer.updatedAt).format("DD.MM.YYYY HH:mm")}</Paragraph>
                </Flex>
            </Flex>
        </>
    );
};

export default HomeworkInfoPanel;
