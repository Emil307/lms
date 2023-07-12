import { Badge, Box, Flex, Text } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { Heading, Switch } from "@shared/ui";
import { useAdminGroup, useUpdateGroupActivity } from "@entities/group";
import useStyles from "./InfoPanel.styles";

export interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { data: groupData } = useAdminGroup({ id });
    const { classes } = useStyles({ statusType: groupData?.status.type });

    const { mutate: updateActivityStatus } = useUpdateGroupActivity({ id });

    const labelActivitySwitch = groupData?.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateActivityStatus({ isActive: newValue.target.checked });

    return (
        <Box>
            <Flex gap={16} align="center" mb={24}>
                <Heading>{groupData?.name}</Heading>
                <Badge variant="outline" className={classes.status}>
                    {groupData?.status.name}
                </Badge>
            </Flex>
            <Flex mt={24} gap={32} align="center">
                <Box className={classes.infoItem}>
                    ID: <span>{groupData?.id}</span>
                </Box>
                <Flex gap={8}>
                    <Text className={classes.infoItem}>Статус:</Text>
                    <Switch
                        checked={groupData?.isActive}
                        onChange={handleChangeActiveStatus}
                        variant="secondary"
                        label={labelActivitySwitch}
                        labelPosition="left"
                    />
                </Flex>
                <Box className={classes.infoItem}>
                    Учебный курс: <span>{groupData?.course.name}</span>
                </Box>
                <Box className={classes.infoItem}>
                    Создание: <span>{groupData?.createdAt ? dayjs(groupData.createdAt).format("DD.MM.YYYY HH:mm") : "-"}</span>
                </Box>
                {/* TODO:  https://gitlab.addamant-work.ru/business-gallery/business-gallery-back/-/issues/156*/}
                {/* <LastUpdatedInfo data={groupData?.lastUpdated} /> */}
            </Flex>
        </Box>
    );
};

export default InfoPanel;
