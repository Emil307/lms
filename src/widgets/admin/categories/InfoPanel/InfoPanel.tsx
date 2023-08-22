import { Box, BoxProps, Flex, ThemeIcon } from "@mantine/core";
import React, { ChangeEvent } from "react";
import { Folder } from "react-feather";
import dayjs from "dayjs";
import { Heading, LastUpdatedInfo, Paragraph, Switch } from "@shared/ui";
import { useAdminCategory, useAdminUpdateCategoryActivity } from "@entities/category";
import { useMedia } from "@shared/utils";
import useStyles from "./InfoPanel.styles";

export interface InfoPanelProps extends BoxProps {
    id: string;
}

const InfoPanel = ({ id, ...props }: InfoPanelProps) => {
    const { classes } = useStyles();
    const { data } = useAdminCategory({ id });

    const isTablet = useMedia("md");

    const { mutate: updateActivityStatus } = useAdminUpdateCategoryActivity({ id });

    const labelActivitySwitch = data?.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateActivityStatus({ isActive: newValue.target.checked });

    return (
        <Box {...props}>
            <Flex align="center" gap={16} mb={24}>
                <ThemeIcon color="dark">
                    <Folder size={isTablet ? 24 : 32} />
                </ThemeIcon>
                <Heading lineClamp={1}>{data?.name}</Heading>
            </Flex>
            <Flex className={classes.infoPanelListInfo}>
                <Flex gap={8}>
                    <Paragraph variant="text-small-m" color="gray45">
                        ID:
                    </Paragraph>
                    <Paragraph variant="text-small-m">{data?.id}</Paragraph>
                </Flex>
                <Flex align="center" gap={8}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Статус:
                    </Paragraph>
                    <Switch
                        variant="secondary"
                        checked={data?.isActive}
                        label={labelActivitySwitch}
                        labelPosition="left"
                        onChange={handleChangeActiveStatus}
                    />
                </Flex>
                <Flex gap={8}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Создание:
                    </Paragraph>
                    <Paragraph variant="text-small-m">{data?.createdAt ? dayjs(data.createdAt).format("DD.MM.YYYY HH:mm") : "-"}</Paragraph>
                </Flex>
                <LastUpdatedInfo data={data?.lastUpdated} />
            </Flex>
        </Box>
    );
};

export default InfoPanel;
