import { Box, Flex, Text } from "@mantine/core";
import React, { ChangeEvent, memo } from "react";
import dayjs from "dayjs";
import { useUserRole } from "@entities/auth";
import { Roles } from "@app/routes";
import { Heading, LastUpdatedInfo, Loader, Paragraph, Switch } from "@shared/ui";
import { useCourseModule, useUpdateCourseModuleActivity } from "@entities/courseModule";
import useStyles from "./InfoPanel.styles";

interface InfoPanelProps {
    courseId: string;
    moduleId: string;
    moduleName: string;
}

const InfoPanel = ({ courseId, moduleId, moduleName }: InfoPanelProps) => {
    const { classes } = useStyles();
    const { data: moduleData, isLoading, isError } = useCourseModule({ courseId, moduleId });
    const { mutate: updateActivityStatus } = useUpdateCourseModuleActivity({ courseId, moduleId, moduleName });

    const userRole = useUserRole();

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
            <Flex className={classes.wrapper}>
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="gray45">
                        ID:
                    </Paragraph>
                    <Paragraph variant="text-small-m" color="dark">
                        {moduleData.id}
                    </Paragraph>
                </Flex>

                {userRole !== Roles.teacher && (
                    <Flex className={classes.item}>
                        <Paragraph variant="text-small-m" color="gray45">
                            Статус:
                        </Paragraph>
                        <Switch
                            checked={moduleData.isActive}
                            onChange={handleChangeActiveStatus}
                            variant="secondary"
                            label={labelActivitySwitch}
                            labelPosition="left"
                        />
                    </Flex>
                )}

                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Создание:
                    </Paragraph>
                    <Paragraph variant="text-small-m" color="dark">
                        {dayjs(moduleData.createdAt).format("DD.MM.YYYY HH:mm")}
                    </Paragraph>
                </Flex>
                <LastUpdatedInfo data={moduleData.lastUpdated} hidden={userRole === Roles.teacher} />
            </Flex>
        </Box>
    );
};

export default memo(InfoPanel);
