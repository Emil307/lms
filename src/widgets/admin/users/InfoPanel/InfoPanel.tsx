import { Box, Flex, Title } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { Checkbox, LastUpdatedInfo, Switch } from "@shared/ui";
import { useDetailUser, useUpdateUserActivity } from "@entities/user";
import { checkRoleOrder, getFullName } from "@shared/utils";
import { useSession } from "@features/auth";
import { useInfoPanelStyles } from "./InfoPanel.styles";

export interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { classes } = useInfoPanelStyles();
    const { data } = useDetailUser(id);
    const { user: authUser } = useSession();
    const { mutate: updateActivityStatus } = useUpdateUserActivity(id);

    const isRoleOrder = checkRoleOrder(authUser?.roles[0].id, data?.roles[0].id) > 0 || authUser?.id === data?.id;

    const labelActivitySwitch = data?.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    return (
        <Box>
            <Title mt={8}>{getFullName({ data: data?.profile })}</Title>
            <Flex mt={24} gap={32} align="center">
                <Box className={classes.infoItem}>
                    ID: <span>{data?.id}</span>
                </Box>
                <Flex gap={8}>
                    Статус:
                    <Switch
                        variant="secondary"
                        label={labelActivitySwitch}
                        labelPosition="left"
                        checked={data?.isActive}
                        onChange={handleChangeActiveStatus}
                        disabled={!isRoleOrder}
                    />
                </Flex>
                {/* TODO: - нужен функционал от бэка */}
                <Checkbox label="Отображать на главной" />
                <Box className={classes.infoItem}>
                    Последний вход: <span>{data?.lastLoginAt ? dayjs(data.lastLoginAt).format("DD.MM.YYYY HH:mm") : "-"}</span>
                </Box>
                <LastUpdatedInfo data={data?.lastUpdated} />
            </Flex>
        </Box>
    );
};

export default InfoPanel;
