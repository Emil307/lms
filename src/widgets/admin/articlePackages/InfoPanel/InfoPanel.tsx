import { Box, Flex, Text } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { useAdminArticlePackage } from "@entities/articlePackage";
import { Switch } from "@shared/ui";
import { useUpdateActivityArticlePackage } from "@entities/articlePackage/api/hooks/mutations/useUpdateActivityArticle";
import useStyles from "./InfoPanel.styles";

export interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { classes } = useStyles();
    const { data: articlePackageData } = useAdminArticlePackage(id);

    const { mutate: updateActivityStatus } = useUpdateActivityArticlePackage(id);

    const labelActivitySwitch = articlePackageData?.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    return (
        <Flex mt={24} gap={32} align="center">
            <Box className={classes.infoItem}>
                ID: <span>{articlePackageData?.id}</span>
            </Box>
            <Flex gap={8}>
                <Text className={classes.infoItem}>Статус:</Text>
                <Switch
                    checked={articlePackageData?.isActive}
                    onChange={handleChangeActiveStatus}
                    variant="secondary"
                    label={labelActivitySwitch}
                    labelPosition="left"
                />
            </Flex>
            <Box className={classes.infoItem}>
                Создание:
                <span>{articlePackageData?.createdAt ? dayjs(articlePackageData.createdAt).format("DD.MM.YYYY HH:mm") : "-"}</span>
            </Box>
            {/* TODO: Логирование добавить как появится на бекенде */}
        </Flex>
    );
};

export default InfoPanel;
