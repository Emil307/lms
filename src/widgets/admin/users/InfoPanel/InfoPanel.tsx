import { Box, Flex, Title } from "@mantine/core";
import React from "react";
import { Checkbox, Switch } from "@shared/ui";
import { useInfoPanelStyles } from "./InfoPanel.styles";

const InfoPanel = () => {
    const { classes } = useInfoPanelStyles();
    return (
        <Box>
            <Title mt={8}>Смирнова Екатерина Владимировна</Title>
            <Flex mt={24} gap={32} align="center">
                <Box className={classes.infoItem}>
                    ID: <span>157</span>
                </Box>
                <Flex gap={8}>
                    <Switch variant="secondary" label="Деактивировать" labelPosition="left" />
                </Flex>
                <Checkbox label="Отображать на главной" />
                <Box className={classes.infoItem}>
                    Последний вход: <span>14.02.2022 15:30</span>
                </Box>
                {/* TODO - информации о последних изменениях на бэке пока не будет */}
            </Flex>
        </Box>
    );
};

export default InfoPanel;
