import { Box, Flex, Title } from "@mantine/core";
import React, { ChangeEvent } from "react";
import { Switch } from "@shared/ui";
import { getFullNameFromProfile } from "@shared/utils";
import { useDetailUser, useUpdateActivityStatusUser } from "@entities/user";
import { useInfoPanelStyles } from "./InfoPanel.styles";

interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { classes } = useInfoPanelStyles();
    const { data } = useDetailUser(id);

    const { mutate: updateActivityStatus } = useUpdateActivityStatusUser(id);

    const labelActivitySwitch = data?.isActive ? "Деактивировать" : "Активировать";

    {
        /* TODO - информации о последнем входе пока нет */
    }
    // const lastLoginDate = getHumanDate(new Date(data?.loginIn ?? ""), {
    //     day: "2-digit",
    //     month: "long",
    //     hour: "2-digit",
    //     minute: "2-digit",
    // });

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    return (
        <Box>
            <Title mt={8}>{getFullNameFromProfile(data?.profile)}</Title>
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
                    {/* TODO - информации о последнем входе пока нет */}
                    {/*Последний вход: <span>{lastLoginDate}</span>*/}
                </Box>
                {/* TODO - информации о последних изменениях на бэке пока нет */}
            </Flex>
        </Box>
    );
};

export default InfoPanel;
