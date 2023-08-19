import { Flex, Text } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { Heading, LastUpdatedInfo, Loader, Paragraph, Switch } from "@shared/ui";
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
            <Heading>{courseData.name}</Heading>
            <Flex className={classes.wrapper}>
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="gray45">
                        ID:
                    </Paragraph>
                    <Paragraph variant="text-small-m" color="dark">
                        {courseData.id}
                    </Paragraph>
                </Flex>
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Статус:
                    </Paragraph>
                    <Switch
                        checked={courseData.isActive}
                        onChange={handleChangeActiveStatus}
                        variant="secondary"
                        label={labelActivitySwitch}
                        labelPosition="left"
                    />
                </Flex>
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Тип курса:
                    </Paragraph>
                    <Checkbox label="Интерактивный" onChange={handleChangeType} checked={courseData.type === "interactive"} />
                </Flex>
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Создание:
                    </Paragraph>
                    <Paragraph variant="text-small-m" color="dark">
                        {dayjs(courseData.createdAt).format("DD.MM.YYYY HH:mm")}
                    </Paragraph>
                </Flex>
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Отображать в популярных:
                    </Paragraph>
                    <Checkbox label="Да" onChange={handleChangePopularity} checked={courseData.isPopular} />
                </Flex>
                <LastUpdatedInfo data={courseData.lastUpdated} />
            </Flex>
        </>
    );
};

export default InfoPanel;
