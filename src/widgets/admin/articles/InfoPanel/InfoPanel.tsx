import { Flex, ThemeIcon, BoxProps } from "@mantine/core";
import React, { ChangeEvent } from "react";
import { ThumbsDown, ThumbsUp } from "react-feather";
import { LastUpdatedInfo, Paragraph, Switch } from "@shared/ui";
import { useUserRole } from "@entities/auth";
import { useAdminArticle, useUpdateArticleActivity } from "@entities/article";
import { Roles } from "@shared/types";
import useStyles from "./InfoPanel.styles";

export interface InfoPanelProps extends BoxProps {
    id: string;
}

const InfoPanel = ({ id, ...props }: InfoPanelProps) => {
    const { classes, cx } = useStyles();
    const { data: articleData } = useAdminArticle({ id });
    const { mutate: updateActivityStatus } = useUpdateArticleActivity({ id, name: articleData?.name });

    const userRole = useUserRole();

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateActivityStatus({ isActive: newValue.target.checked });

    const labelActivitySwitch = articleData?.isActive ? "Деактивировать" : "Активировать";

    return (
        <Flex {...props} className={cx(classes.root, props.className)}>
            <Flex gap={8}>
                <Paragraph variant="text-small-m" color="neutralMain50">
                    ID:
                </Paragraph>
                <Paragraph variant="text-small-m">{articleData?.id}</Paragraph>
            </Flex>

            {userRole?.name !== Roles.teacher && (
                <Flex align="center" gap={8}>
                    <Paragraph variant="text-small-m" color="neutralMain50">
                        Статус:
                    </Paragraph>
                    <Switch
                        checked={articleData?.isActive}
                        onChange={handleChangeActiveStatus}
                        variant="secondary"
                        label={labelActivitySwitch}
                        labelPosition="left"
                    />
                </Flex>
            )}

            <Flex gap={8} align="center">
                <Paragraph variant="text-small-m" color="neutralMain50">
                    Рейтинг:
                </Paragraph>
                <Flex gap={16}>
                    <Flex gap={8}>
                        <ThemeIcon color="dark">
                            <ThumbsUp />
                        </ThemeIcon>
                        <Paragraph variant="small-semi">{articleData?.likesCount}</Paragraph>
                    </Flex>
                    <Flex gap={8}>
                        <ThemeIcon color="dark">
                            <ThumbsDown />
                        </ThemeIcon>
                        <Paragraph variant="small-semi">{articleData?.dislikesCount}</Paragraph>
                    </Flex>
                </Flex>
            </Flex>
            <LastUpdatedInfo data={articleData?.lastUpdated} hidden={userRole?.name === Roles.teacher} />
        </Flex>
    );
};

export default InfoPanel;
