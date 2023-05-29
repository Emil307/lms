import { Box, Flex, Text } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { Switch } from "@shared/ui";
import { useAdminCoursePackage, useUpdateCoursePackageActivity } from "@entities/coursePackage";
import useStyles from "./InfoPanel.styles";

export interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { classes } = useStyles();
    const { data: coursePackageData } = useAdminCoursePackage(id);

    const { mutate: updateActivityStatus } = useUpdateCoursePackageActivity(id);

    const labelActivitySwitch = coursePackageData?.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    return (
        <Flex mt={24} gap={32} align="center">
            <Box className={classes.infoItem}>
                ID: <span>{coursePackageData?.id}</span>
            </Box>
            <Flex gap={8}>
                <Text className={classes.infoItem}>Статус:</Text>
                <Switch
                    checked={coursePackageData?.isActive}
                    onChange={handleChangeActiveStatus}
                    variant="secondary"
                    label={labelActivitySwitch}
                    labelPosition="left"
                />
            </Flex>
            <Box className={classes.infoItem}>
                Создание:
                <span>{coursePackageData?.createdAt ? dayjs(coursePackageData.createdAt).format("DD.MM.YYYY HH:mm") : "-"}</span>
            </Box>
            {/* TODO: Логирование добавить как появится на бекенде */}
        </Flex>
    );
};

export default InfoPanel;
