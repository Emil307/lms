import { Box, Flex } from "@mantine/core";
import React, { ChangeEvent } from "react";
import { Switch } from "@shared/ui";
import { getHumanDate } from "@shared/utils";
import { useAuthor, useUpdateActivityAuthor } from "@entities/author";
import useStyles from "./InfoPanel.styles";

interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { classes } = useStyles();
    const { data } = useAuthor(id);

    const { mutate: updateActivityStatus } = useUpdateActivityAuthor(id);

    const createdAtDate = getHumanDate(new Date(data?.createdAt ?? ""), {
        day: "2-digit",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
    });

    const updatedAtDate = getHumanDate(new Date(data?.updatedAt ?? ""), {
        day: "2-digit",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
    });

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    return (
        <Flex gap={32} align="center">
            <Box className={classes.infoItem}>
                ID: <span>{data?.id}</span>
            </Box>
            <Flex gap={8} align="center" className={classes.infoItem}>
                Статус:
                <Switch
                    variant="secondary"
                    label="Деактивировать"
                    labelPosition="left"
                    checked={data?.isActive}
                    onChange={handleChangeActiveStatus}
                />
            </Flex>
            <Box className={classes.infoItem}>
                Создание: <span>{createdAtDate}</span>
            </Box>
            <Box className={classes.infoItem}>
                {/* TODO - информации о последних изменениях на бэке пока нет (кто именно изменил автора) */}
                Изменение: <span>{updatedAtDate}</span>
            </Box>
        </Flex>
    );
};

export default InfoPanel;
