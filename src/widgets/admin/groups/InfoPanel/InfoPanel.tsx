import { Badge, Box, Flex, Title, Text } from "@mantine/core";
import React, { ChangeEvent, useCallback, useMemo } from "react";
import dayjs from "dayjs";
import { Switch } from "@shared/ui";
import { useActivateGroup, useAdminGroup, useDeactivateGroup } from "@entities/group";
import useStyles from "./InfoPanel.styles";

interface InfoPanel {
    id: string;
}

const InfoPanel = ({ id }: InfoPanel) => {
    const { data: groupData } = useAdminGroup(id);
    const { mutate: activate } = useActivateGroup(id);
    const { mutate: deactivate } = useDeactivateGroup(id);
    const { classes } = useStyles({ status: groupData?.data.status });

    const renderStatus = useMemo(() => {
        switch (groupData?.data.status) {
            case "notStarted":
                return "Новая";
            case "done":
                return "Завершена";
            default:
                break;
        }
    }, [groupData?.data.status]);

    const handleChangeActiveStatus = useCallback((newValue: ChangeEvent<HTMLInputElement>) => {
        if (newValue.target.checked) {
            return activate();
        }
        return deactivate();
    }, []);

    return (
        <Box>
            <Flex align="center" gap={16}>
                <Title order={1} color="dark">
                    {groupData?.data.name}
                </Title>
                <Badge variant="outline" className={classes.status}>
                    {renderStatus}
                </Badge>
            </Flex>
            <Flex mt={24} gap={32} align="center">
                <Box className={classes.infoItem}>
                    ID: <span>{groupData?.data.id}</span>
                </Box>
                <Flex gap={8}>
                    <Text className={classes.infoItem}>Статус:</Text>
                    <Switch
                        checked={!!groupData?.data.isActive}
                        onChange={handleChangeActiveStatus}
                        variant="secondary"
                        label="Деактивировать"
                        labelPosition="left"
                    />
                </Flex>
                <Box className={classes.infoItem}>
                    Учебный курс: <span>{groupData?.data.courseName || "-"}</span>
                </Box>
                <Box className={classes.infoItem}>
                    Создание: <span>{groupData?.data.createdAt ? dayjs(groupData.data.createdAt).format("DD.MM.YYYY HH:mm") : "-"}</span>
                </Box>
            </Flex>
        </Box>
    );
};

export default InfoPanel;
