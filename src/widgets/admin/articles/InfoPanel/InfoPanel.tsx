import { Box, Flex, Text, ThemeIcon, BoxProps } from "@mantine/core";
import React, { ChangeEvent } from "react";
import { ThumbsDown, ThumbsUp } from "react-feather";
import { Heading, LastUpdatedInfo, Switch } from "@shared/ui";
import { useAdminArticle, useUpdateArticleActivity } from "@entities/article";
import useStyles from "./InfoPanel.styles";

export interface InfoPanelProps extends BoxProps {
    id: string;
}

const InfoPanel = ({ id, ...props }: InfoPanelProps) => {
    const { classes } = useStyles();
    const { data: articleData } = useAdminArticle({ id });
    const { mutate: updateActivityStatus } = useUpdateArticleActivity(id);

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    const labelActivitySwitch = articleData?.isActive ? "Деактивировать" : "Активировать";

    return (
        <Box {...props}>
            <Heading>{articleData?.name}</Heading>
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
                <LastUpdatedInfo data={articleData?.lastUpdated} />
            </Flex>
        </Box>
    );
};

export default InfoPanel;
