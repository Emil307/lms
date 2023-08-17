import { Badge, Box, BoxProps, Flex } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { Heading, LastUpdatedInfo, Paragraph, Switch } from "@shared/ui";
import { useAdminGroup, useUpdateGroupActivity } from "@entities/group";
import useStyles from "./InfoPanel.styles";

export interface InfoPanelProps extends Omit<BoxProps, "children"> {
    id: string;
}

const InfoPanel = ({ id, ...props }: InfoPanelProps) => {
    const { data: groupData } = useAdminGroup({ id });
    const { classes } = useStyles({ statusType: groupData?.status.type });

    const { mutate: updateActivityStatus } = useUpdateGroupActivity({ id });

    const labelActivitySwitch = groupData?.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateActivityStatus({ isActive: newValue.target.checked });

    return (
        <Box {...props}>
            <Flex className={classes.headingContainer}>
                <Heading>{groupData?.name}</Heading>
                <Badge className={classes.status}>{groupData?.status.name}</Badge>
            </Flex>
            <Flex className={classes.infoPanelListInfo}>
                <Flex gap={8}>
                    <Paragraph variant="text-small-m" color="gray45">
                        ID:
                    </Paragraph>
                    <Paragraph variant="text-small-m">{groupData?.id}</Paragraph>
                </Flex>
                <Flex align="center" gap={8}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Статус:
                    </Paragraph>
                    <Switch
                        checked={groupData?.isActive}
                        onChange={handleChangeActiveStatus}
                        variant="secondary"
                        label={labelActivitySwitch}
                        labelPosition="left"
                    />
                </Flex>
                <Flex gap={8}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Учебный курс:
                    </Paragraph>
                    <Paragraph variant="text-small-m">{groupData?.course.name}</Paragraph>
                </Flex>
                <Flex gap={8}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Создание:
                    </Paragraph>
                    <Paragraph variant="text-small-m">
                        {groupData?.createdAt ? dayjs(groupData.createdAt).format("DD.MM.YYYY HH:mm") : "-"}
                    </Paragraph>
                </Flex>
                <LastUpdatedInfo data={groupData?.lastUpdated} />
            </Flex>
        </Box>
    );
};

export default InfoPanel;
