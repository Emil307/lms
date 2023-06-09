import { Box, Flex } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { LastUpdatedInfo, Switch } from "@shared/ui";
import { useAdminAuthor, useUpdateAuthorActivity } from "@entities/author";
import useStyles from "./InfoPanel.styles";

interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { classes } = useStyles();
    const { data } = useAdminAuthor({ id });

    const { mutate: updateActivityStatus } = useUpdateAuthorActivity({ id });

    const labelActivitySwitch = data?.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateActivityStatus({ isActive: newValue.target.checked });

    return (
        <Flex gap={32} align="center">
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
                Создание: <span>{dayjs(data?.createdAt).format("DD.MM.YYYY hh:mm")}</span>
            </Box>
            <LastUpdatedInfo data={data?.lastUpdated} />
        </Flex>
    );
};

export default InfoPanel;
