import { Box, Flex, ThemeIcon, Title } from "@mantine/core";
import React, { ChangeEvent } from "react";
import { Folder } from "react-feather";
import { Switch } from "@shared/ui";
import { useAdminCategory, useUpdateActivityCategory } from "@entities/category";
import { getHumanDate } from "@shared/utils";
import { useInfoPanelStyles } from "./InfoPanel.styles";

interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { classes } = useInfoPanelStyles();
    const { data } = useAdminCategory(id);

    const { mutate: updateActivityStatus } = useUpdateActivityCategory(id);

    const labelActivitySwitch = data?.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    const createdAtDate = getHumanDate(new Date(data?.createdAt ?? ""), {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <Box>
            <Title order={1} color="dark" sx={{ display: "flex", alignItems: "center", marginBottom: 32, gap: 16 }}>
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
                    Создание: <span>{createdAtDate}</span>
                </Box>
                {/* TODO: - информации о последних изменениях на бэке пока нет */}
            </Flex>
        </Box>
    );
};

export default InfoPanel;
