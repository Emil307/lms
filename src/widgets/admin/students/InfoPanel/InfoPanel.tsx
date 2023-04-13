import { Box, Flex, Title } from "@mantine/core";
import React, { ChangeEvent } from "react";
import { Switch } from "@shared/ui";
import { getHumanDate } from "@shared/utils";
import { useActivateUser, useDeactivateUser, useDetailUser } from "@entities/user";
import { useInfoPanelStyles } from "./InfoPanel.styles";

interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { classes } = useInfoPanelStyles();
    const { data } = useDetailUser(id);

    const { mutate: activate } = useActivateUser(id);
    const { mutate: deactivate } = useDeactivateUser(id);

    const lastLoginDate = getHumanDate(new Date(data?.loginIn ?? ""), {
        day: "2-digit",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
    });

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => {
        if (newValue.target.checked) {
            return activate();
        }
        return deactivate();
    };

    return (
        <Box>
            <Title mt={8}>
                {data?.firstName} {data?.patronymic} {data?.lastName}
            </Title>
            <Flex mt={24} gap={32} align="center">
                <Box className={classes.infoItem}>
                    ID: <span>{data?.id}</span>
                </Box>
                <Flex gap={8} align="center" className={classes.infoItem}>
                    Статус:
                    <Switch variant="secondary" label="Деактивировать" labelPosition="left" onChange={handleChangeActiveStatus} />
                </Flex>
                <Box className={classes.infoItem}>
                    Последний вход: <span>{lastLoginDate}</span>
                </Box>
                {/* TODO - информации о последних изменениях на бэке пока нет */}
            </Flex>
        </Box>
    );
};

export default InfoPanel;
