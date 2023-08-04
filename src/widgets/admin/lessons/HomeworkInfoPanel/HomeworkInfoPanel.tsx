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
    const { classes } = useStyles({ status: homeworkAnswer.status.name });

    const getStatusName = () => {
        switch (homeworkAnswer.status.name) {
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
            <Flex mt={24} gap={32} align="center">
                {homeworkAnswer.status.name !== "completed" && (
                    <Flex className={classes.item}>
                        <Paragraph variant="text-small-m" color="gray45">
                            Статус:
                        </Paragraph>
                        <Box className={classes.status}>
                            <Paragraph variant="text-small-m">{getStatusName()}</Paragraph>
                        </Box>
                    </Flex>
                )}
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Обязательность:
                    </Paragraph>
                    <Paragraph variant="text-small-m" color="dark">
                        {homeworkAnswer.homework.requiredType === "required" ? "Да" : "Нет"}
                    </Paragraph>
                </Flex>
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Группа:
                    </Paragraph>
                    <Paragraph variant="text-small-m" color="dark">
                        {homeworkAnswer.group.name}
                    </Paragraph>
                </Flex>
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Учебный курс:
                    </Paragraph>
                    <Paragraph variant="text-small-m" color="dark">
                        {homeworkAnswer.course.name}
                    </Paragraph>
                </Flex>
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Дата выполнения:
                    </Paragraph>
                    <Paragraph variant="text-small-m" color="dark">
                        {dayjs(homeworkAnswer.updatedAt).format("DD.MM.YYYY HH:mm")}
                    </Paragraph>
                </Flex>
            </Flex>
        </>
    );
};

export default HomeworkInfoPanel;
