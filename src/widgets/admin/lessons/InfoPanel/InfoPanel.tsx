import { Flex, Text, Title } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { LastUpdatedInfo, Loader, Switch } from "@shared/ui";
import useStyles from "./InfoPanel.styles";
import { useAdminLesson, useUpdateLessonActivity } from "@entities/lesson";

interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { classes } = useStyles();
    const { data: lessonData, isLoading, isError } = useAdminLesson(id);
    const { mutate: updateActivityStatus } = useUpdateLessonActivity({ id });

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    const labelActivitySwitch = lessonData.isActive ? "Деактивировать" : "Активировать";

    return (
        <>
            <Title order={1} color="dark">
                {lessonData.name}
            </Title>
            <Flex mt={24} gap={32} align="center">
                <Flex className={classes.item}>
                    <span className={classes.label}>ID:</span> <span>{lessonData.id}</span>
                </Flex>
                <Flex className={classes.item}>
                    <Text className={classes.label}>Статус:</Text>
                    <Switch
                        checked={lessonData.isActive}
                        onChange={handleChangeActiveStatus}
                        variant="secondary"
                        label={labelActivitySwitch}
                        labelPosition="left"
                    />
                </Flex>
                <Flex className={classes.item}>
                    <Text className={classes.label}>Создание:</Text>
                    <Text>{dayjs(lessonData.createdAt).format("DD.MM.YYYY HH:mm")}</Text>
                </Flex>
                <LastUpdatedInfo data={lessonData.lastUpdated} />
            </Flex>
        </>
    );
};

export default InfoPanel;
