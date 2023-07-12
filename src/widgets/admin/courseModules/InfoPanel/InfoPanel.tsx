import { Box, Flex, Text } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { Heading, Loader, Switch } from "@shared/ui";
import { useCourseModule, useUpdateCourseModuleActivity } from "@entities/courseModule";
import useStyles from "./InfoPanel.styles";

interface InfoPanelProps {
    courseId: string;
    moduleId: string;
}

const InfoPanel = ({ courseId, moduleId }: InfoPanelProps) => {
    const { classes } = useStyles();
    const { data: moduleData, isLoading, isError } = useCourseModule({ courseId, moduleId });
    const { mutate: updateActivityStatus } = useUpdateCourseModuleActivity({ courseId, moduleId });

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    const labelActivitySwitch = moduleData.isActive ? "Деактивировать" : "Активировать";

    return (
        <Box mb={32}>
            <Heading>{moduleData.name}</Heading>
            <Flex mt={24} gap={32} align="center">
                <Flex className={classes.item}>
                    <span className={classes.label}>ID:</span> <span>{moduleData.id}</span>
                </Flex>
                <Flex className={classes.item}>
                    <Text className={classes.label}>Статус:</Text>
                    <Switch
                        checked={moduleData.isActive}
                        onChange={handleChangeActiveStatus}
                        variant="secondary"
                        label={labelActivitySwitch}
                        labelPosition="left"
                    />
                </Flex>
                <Flex className={classes.item}>
                    <Text className={classes.label}>Создание:</Text>
                    <Text>{dayjs(moduleData.createdAt).format("DD.MM.YYYY HH:mm")}</Text>
                </Flex>
                {/* TODO: Добавить информацию updatedAt как добавиться компонент LastUpdated */}
                {/*<LastUpdatedInfo data={moduleData.lastUpdated} />*/}
            </Flex>
        </Box>
    );
};

export default InfoPanel;
