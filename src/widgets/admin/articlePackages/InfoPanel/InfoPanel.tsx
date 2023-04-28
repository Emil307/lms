import { Box, Flex } from "@mantine/core";
import React from "react";
import dayjs from "dayjs";
import { useAdminArticlePackage } from "@entities/articlePackage";
import useStyles from "./InfoPanel.styles";

export interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { data: articlePackageData } = useAdminArticlePackage(id);
    const { classes } = useStyles();

    //TODO: Когда бек добавить статусы активности
    // const labelActivitySwitch = articlePackageData?.isActive ? "Деактивировать" : "Активировать";

    // const handleChangeActiveStatus = useCallback((newValue: ChangeEvent<HTMLInputElement>) => {
    //     if (newValue.target.checked) {
    //         return activate();
    //     }
    //     return deactivate();
    // }, []);

    return (
        <Flex mt={24} gap={32} align="center">
            <Box className={classes.infoItem}>
                ID: <span>{articlePackageData?.id}</span>
            </Box>
            {/* //TODO: Когда бек добавить статусы активности
            <Flex gap={8}>
                <Text className={classes.infoItem}>Статус:</Text>
                <Switch
                    // checked={!!articlePackageData?.isActive}
                    // onChange={handleChangeActiveStatus}
                    variant="secondary"
                    label={labelActivitySwitch}
                    labelPosition="left"
                />
            </Flex> */}
            <Box className={classes.infoItem}>
                Создание:
                <span>{articlePackageData?.createdAt ? dayjs(articlePackageData.createdAt).format("DD.MM.YYYY HH:mm") : "-"}</span>
            </Box>
            {/* TODO: Логирование добавить как появится на бекенде */}
        </Flex>
    );
};

export default InfoPanel;
