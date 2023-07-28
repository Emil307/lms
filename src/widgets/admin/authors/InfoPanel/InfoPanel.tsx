import { Flex, FlexProps } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { LastUpdatedInfo, Paragraph, Switch } from "@shared/ui";
import { useAdminAuthor, useUpdateAuthorActivity } from "@entities/author";
import useStyles from "./InfoPanel.styles";

interface InfoPanelProps extends Omit<FlexProps, "children"> {
    id: string;
}

const InfoPanel = ({ id, ...props }: InfoPanelProps) => {
    const { classes } = useStyles();
    const { data } = useAdminAuthor({ id });

    const { mutate: updateActivityStatus } = useUpdateAuthorActivity({ id });

    const labelActivitySwitch = data?.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateActivityStatus({ isActive: newValue.target.checked });

    return (
        <Flex className={classes.infoPanelListInfo} {...props}>
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
                    label={labelActivitySwitch}
                    labelPosition="left"
                    checked={data?.isActive}
                    onChange={handleChangeActiveStatus}
                />
            </Flex>
            <Flex gap={8}>
                <Paragraph variant="text-small-m" color="gray45">
                    Создание:
                </Paragraph>
                <Paragraph variant="text-small-m">{dayjs(data?.createdAt).format("DD.MM.YYYY hh:mm")}</Paragraph>
            </Flex>
            <LastUpdatedInfo data={data?.lastUpdated} />
        </Flex>
    );
};

export default InfoPanel;
