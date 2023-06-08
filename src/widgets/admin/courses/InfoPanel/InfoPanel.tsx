import { Flex, Text, Loader, Title } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { Switch } from "@shared/ui";

import { useAdminCourse, useUpdateCourseActivity, useUpdateCoursePopularity, useUpdateCourseType } from "@entities/course";
import { Checkbox } from "@shared/ui/Forms";
import useStyles from "./InfoPanel.styles";

interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { classes } = useStyles();
    const { data: courseData, isLoading, isError } = useAdminCourse(id);
    const { mutate: updateActivityStatus } = useUpdateCourseActivity(id);
    const { mutate: updateType } = useUpdateCourseType(id);
    const { mutate: updatePopularity } = useUpdateCoursePopularity(id);

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);
    const handleChangeType = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateType(newValue.target.checked ? "interactive" : "autonomous");
    const handleChangePopularity = (newValue: ChangeEvent<HTMLInputElement>) => updatePopularity(newValue.target.checked);

    const labelActivitySwitch = courseData.isActive ? "Деактивировать" : "Активировать";

    return (
        <>
            <Title order={1} color="dark">
                {courseData.name}
            </Title>
            <Flex mt={24} gap={32} align="center">
                <Flex className={classes.item}>
                    <span className={classes.label}>ID:</span> <span>{courseData.id}</span>
                </Flex>
                <Flex className={classes.item}>
                    <Text className={classes.label}>Статус:</Text>
                    <Switch
                        checked={courseData.isActive}
                        onChange={handleChangeActiveStatus}
                        variant="secondary"
                        label={labelActivitySwitch}
                        labelPosition="left"
                    />
                </Flex>
                <Flex className={classes.item}>
                    <Text className={classes.label}>Тип курса:</Text>
                    <Checkbox label="Интерактивный" onChange={handleChangeType} checked={courseData.type === "interactive"} />
                </Flex>
                <Flex className={classes.item}>
                    <Text className={classes.label}>Создание:</Text>
                    <Text>{dayjs(courseData.createdAt).format("DD.MM.YYYY HH:mm")}</Text>
                </Flex>
                <Flex className={classes.item}>
                    <Text className={classes.label}>Отображать в популярных:</Text>
                    <Checkbox label="Да" onChange={handleChangePopularity} checked={courseData.isPopular} />
                </Flex>
                {/* TODO: Добавить информацию updatedAt как добавиться компонент LastUpdated */}
                {/*<LastUpdatedInfo data={courseData.lastUpdated} />*/}
            </Flex>
        </>
    );
};

export default InfoPanel;
