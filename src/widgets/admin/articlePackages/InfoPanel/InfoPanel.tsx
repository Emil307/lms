import { Flex, FlexProps } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { AdminArticlePackage, useUpdateArticlePackageActivity } from "@entities/articlePackage";
import { LastUpdatedInfo, Paragraph, Switch } from "@shared/ui";
import useStyles from "./InfoPanel.styles";

export interface InfoPanelProps extends Omit<FlexProps, "children"> {
    data: AdminArticlePackage;
}

const InfoPanel = ({ data, ...props }: InfoPanelProps) => {
    const { classes, cx } = useStyles();

    const { mutate: updateActivityStatus } = useUpdateArticlePackageActivity({ id: String(data.id), name: data.name });

    const labelActivitySwitch = data.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateActivityStatus({ isActive: newValue.target.checked });

    return (
        <Flex {...props} className={cx(classes.root, props.className)}>
            <Flex gap={8}>
                <Paragraph variant="text-small-m" color="neutralMain50">
                    ID:
                </Paragraph>
                <Paragraph variant="text-small-m">{data.id}</Paragraph>
            </Flex>
            <Flex align="center" gap={8}>
                <Paragraph variant="text-small-m" color="neutralMain50">
                    Статус:
                </Paragraph>
                <Switch
                    checked={data.isActive}
                    onChange={handleChangeActiveStatus}
                    variant="secondary"
                    label={labelActivitySwitch}
                    labelPosition="left"
                />
            </Flex>
            <Flex gap={8}>
                <Paragraph variant="text-small-m" color="neutralMain50">
                    Создание:
                </Paragraph>
                <Paragraph variant="text-small-m">{dayjs(data.createdAt).format("DD.MM.YYYY HH:mm")}</Paragraph>
            </Flex>
            <LastUpdatedInfo data={data.lastUpdated} />
        </Flex>
    );
};

export default InfoPanel;
