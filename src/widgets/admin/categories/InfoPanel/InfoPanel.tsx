import { Box, Flex, ThemeIcon, Title } from "@mantine/core";
import React, { ChangeEvent } from "react";
import { Folder } from "react-feather";
import dayjs from "dayjs";
import { LastUpdatedInfo, Switch } from "@shared/ui";
import { useAdminCategory, useAdminUpdateCategoryActivity } from "@entities/category";
import { useInfoPanelStyles } from "./InfoPanel.styles";

export interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { classes } = useInfoPanelStyles();
    const { data } = useAdminCategory({ id });

    const { mutate: updateActivityStatus } = useAdminUpdateCategoryActivity({ id });

    const labelActivitySwitch = data?.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateActivityStatus({ isActive: newValue.target.checked });

    return (
        <Box>
            <Title order={1} color="dark" sx={{ display: "flex", alignItems: "center", marginBottom: 24, gap: 16 }}>
                <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                    <Folder />
                </ThemeIcon>
                {data?.name}
            </Title>
            <Flex gap={32} align="center">
                <Box className={classes.infoItem}>
                    ID: <span>{data?.id}</span>
                </Box>
                <Flex gap={8} align="center" className={classes.infoItem}>
                    Статус:
                    <Switch
                        variant="secondary"
                        checked={data?.isActive}
                        label={labelActivitySwitch}
                        labelPosition="left"
                        onChange={handleChangeActiveStatus}
                    />
                </Flex>
                <Box className={classes.infoItem}>
                    Создание: <span>{data?.createdAt ? dayjs(data.createdAt).format("DD.MM.YYYY HH:mm") : "-"}</span>
                </Box>
                <LastUpdatedInfo data={data?.lastUpdated} />
            </Flex>
        </Box>
    );
};

export default InfoPanel;
