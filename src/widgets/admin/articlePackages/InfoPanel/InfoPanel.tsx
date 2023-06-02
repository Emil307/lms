import { Box, Flex, Text } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { useAdminArticlePackage, useUpdateArticlePackageActivity } from "@entities/articlePackage";
import { LastUpdatedInfo, Switch } from "@shared/ui";
import useStyles from "./InfoPanel.styles";

export interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { classes } = useStyles();
    const { data: articlePackageData } = useAdminArticlePackage(id);

    const { mutate: updateActivityStatus } = useUpdateArticlePackageActivity(id);

    const labelActivitySwitch = articlePackageData?.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    return (
        <Flex mt={24} gap={32} align="center">
            <Box className={classes.infoItem}>
                ID: <span>{articlePackageData?.id}</span>
            </Box>
            <Flex gap={8}>
                <Text className={classes.infoItem}>Статус:</Text>
                <Switch
                    checked={articlePackageData?.isActive}
                    onChange={handleChangeActiveStatus}
                    variant="secondary"
                    label={labelActivitySwitch}
                    labelPosition="left"
                />
            </Flex>
            <Box className={classes.infoItem}>
                Создание:{" "}
                <span>{articlePackageData?.createdAt ? dayjs(articlePackageData.createdAt).format("DD.MM.YYYY HH:mm") : "-"}</span>
            </Box>
            <LastUpdatedInfo data={articlePackageData?.lastUpdated} />
        </Flex>
    );
};

export default InfoPanel;
