import { Box, Flex, Title } from "@mantine/core";
import React from "react";
import { Checkbox, Switch } from "@shared/ui";
import { getHumanDate } from "@shared/utils";
import { useDetailUser } from "@entities/user";
import { useInfoPanelStyles } from "./InfoPanel.styles";

interface InfoPanel {
    id: string;
}

const InfoPanel = ({ id }: InfoPanel) => {
    const { classes } = useInfoPanelStyles();
    const { data } = useDetailUser(id);

    const labelActivitySwitch = data?.isActive ? "Деактивировать" : "Активировать";

    const lastLoginDate = getHumanDate(new Date(data?.loginIn ?? ""), {
        day: "2-digit",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <Box>
            <Title mt={8}>
                {data?.firstName} {data?.patronymic} {data?.lastName}
            </Title>
            <Flex mt={24} gap={32} align="center">
                <Box className={classes.infoItem}>
                    ID: <span>{data?.id}</span>
                </Box>
                {/* TODO - нужен функционал от бэка */}
                <Flex gap={8}>
                    <Switch variant="secondary" checked={data?.isActive} label={labelActivitySwitch} labelPosition="left" />
                </Flex>
                <Checkbox label="Отображать на главной" />
                <Box className={classes.infoItem}>
                    Последний вход: <span>{lastLoginDate}</span>
                </Box>
                {/* TODO - информации о последних изменениях на бэке пока не будет */}
            </Flex>
        </Box>
    );
};

export default InfoPanel;
