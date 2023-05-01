import { Box, Flex, Title, Text, ThemeIcon, BoxProps } from "@mantine/core";
import React, { ChangeEvent, useCallback } from "react";
import dayjs from "dayjs";
import { ThumbsDown, ThumbsUp } from "react-feather";
import { Switch } from "@shared/ui";
import { useActivateArticle, useAdminArticle, useDeactivateArticle } from "@entities/article";
import useStyles from "./InfoPanel.styles";

export interface InfoPanelProps extends BoxProps {
    id: string;
}

const InfoPanel = ({ id, ...props }: InfoPanelProps) => {
    const { classes } = useStyles();
    const { data: articleData } = useAdminArticle(id);
    const { mutate: activate } = useActivateArticle(id);
    const { mutate: deactivate } = useDeactivateArticle(id);

    const handleChangeActiveStatus = useCallback((newValue: ChangeEvent<HTMLInputElement>) => {
        if (newValue.target.checked) {
            return deactivate();
        }
        return activate();
    }, []);

    const labelActivitySwitch = articleData?.isActive ? "Деактивировать" : "Активировать";

    return (
        <Box {...props}>
            <Title order={1} color="dark">
                {articleData?.name}
            </Title>
            <Flex mt={24} gap={32} align="center">
                <Box className={classes.infoItem}>
                    ID: <span>{articleData?.id}</span>
                </Box>
                <Flex gap={8}>
                    <Text className={classes.infoItem}>Статус:</Text>
                    <Switch
                        checked={!!articleData?.isActive}
                        onChange={handleChangeActiveStatus}
                        variant="secondary"
                        label={labelActivitySwitch}
                        labelPosition="left"
                    />
                </Flex>
                <Flex gap={8} align="center">
                    <Text className={classes.ratingTitle}>Рейтинг:</Text>
                    <Flex gap={16}>
                        <Flex gap={8}>
                            <ThemeIcon variant="outline" color="dark" className={classes.thumbs}>
                                <ThumbsUp />
                            </ThemeIcon>
                            <Text className={classes.ratingValue}>{articleData?.likesCount}</Text>
                        </Flex>
                        <Flex gap={8}>
                            <ThemeIcon variant="outline" color="dark" className={classes.thumbs}>
                                <ThumbsDown />
                            </ThemeIcon>
                            <Text className={classes.ratingValue}>{articleData?.dislikesCount}</Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Box className={classes.infoItem}>
                    Изменение: <span>{articleData?.updated_at ? dayjs(articleData.updated_at).format("DD.MM.YYYY HH:mm") : "-"}</span>
                </Box>
            </Flex>
        </Box>
    );
};

export default InfoPanel;
