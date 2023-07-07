import { Box, Flex, Text } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { LastUpdatedInfo, Switch } from "@shared/ui";
import { useAdminCourseCollection, useAdminUpdateCourseCollectionActivity } from "@entities/courseCollection";
import useStyles from "./InfoPanel.styles";

export interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { classes } = useStyles();
    const { data: courseCollectionData } = useAdminCourseCollection({ id });

    const { mutate: updateActivityStatus } = useAdminUpdateCourseCollectionActivity({ id });

    const labelActivitySwitch = courseCollectionData?.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateActivityStatus({ isActive: newValue.target.checked });

    return (
        <Flex mt={24} gap={32} align="center">
            <Box className={classes.infoItem}>
                ID: <span>{courseCollectionData?.id}</span>
            </Box>
            <Flex gap={8}>
                <Text className={classes.infoItem}>Статус:</Text>
                <Switch
                    checked={courseCollectionData?.isActive}
                    onChange={handleChangeActiveStatus}
                    variant="secondary"
                    label={labelActivitySwitch}
                    labelPosition="left"
                />
            </Flex>
            <Box className={classes.infoItem}>
                Создание:{" "}
                <span>{courseCollectionData?.createdAt ? dayjs(courseCollectionData.createdAt).format("DD.MM.YYYY HH:mm") : "-"}</span>
            </Box>
            <LastUpdatedInfo data={courseCollectionData?.lastUpdated} />
        </Flex>
    );
};

export default InfoPanel;
