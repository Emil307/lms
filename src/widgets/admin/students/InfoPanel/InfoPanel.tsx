import { Box, Flex, Title } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { LastUpdatedInfo, Switch } from "@shared/ui";
import { getFullName } from "@shared/utils";
import { useDetailUser, useUpdateUserActivity } from "@entities/user";
import { useInfoPanelStyles } from "./InfoPanel.styles";

interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { classes } = useInfoPanelStyles();
    const { data } = useDetailUser(id);

    const { mutate: updateActivityStatus } = useUpdateUserActivity(id);

    const labelActivitySwitch = data?.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    return (
        <Box>
            <Title mt={8}>{getFullName({ data: data?.profile })}</Title>
            <Flex mt={24} gap={32} align="center">
                <Box className={classes.infoItem}>
                    ID: <span>{data?.id}</span>
                </Box>
                <Flex gap={8} align="center" className={classes.infoItem}>
                    Статус:
                    <Switch
                        variant="secondary"
                        label={labelActivitySwitch}
                        labelPosition="left"
                        checked={data?.isActive}
                        onChange={handleChangeActiveStatus}
                    />
                </Flex>
                <Box className={classes.infoItem}>
                    Последний вход: <span>{data?.lastLoginAt ? dayjs(data.lastLoginAt).format("DD.MM.YYYY HH:mm") : "-"}</span>
                </Box>
                <LastUpdatedInfo data={data?.lastUpdated} />
            </Flex>
        </Box>
    );
};

export default InfoPanel;
