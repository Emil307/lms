import { Box, BoxProps, Flex } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { Heading, LastUpdatedInfo, Paragraph, Switch } from "@shared/ui";
import { getFullName } from "@shared/utils";
import { useDetailsUser, useUpdateUserActivity } from "@entities/user";
import useStyles from "./InfoPanel.styles";
import { useUserRole } from "@entities/auth/hooks";
import { Roles } from "@app/routes";

export interface InfoPanelProps extends Omit<BoxProps, "children"> {
    id: string;
}

const InfoPanel = ({ id, ...props }: InfoPanelProps) => {
    const { classes } = useStyles();

    const userRole = useUserRole();

    const { data } = useDetailsUser(id);

    const userFullname = getFullName({ data: data?.profile });

    const { mutate: updateActivityStatus } = useUpdateUserActivity({ id, fio: userFullname });

    const labelActivitySwitch = data?.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    return (
        <Box {...props}>
            <Heading mb={24}>{userFullname}</Heading>
            <Flex className={classes.infoPanelListInfo}>
                <Flex gap={8}>
                    <Paragraph variant="text-small-m" color="gray45">
                        ID:
                    </Paragraph>
                    <Paragraph variant="text-small-m">{data?.id}</Paragraph>
                </Flex>

                {userRole !== Roles.teacher && (
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
                )}

                <Flex gap={8}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Последний вход:
                    </Paragraph>
                    <Paragraph variant="text-small-m">
                        {data?.lastLoginAt ? dayjs(data.lastLoginAt).format("DD.MM.YYYY HH:mm") : "-"}
                    </Paragraph>
                </Flex>
                <LastUpdatedInfo data={data?.lastUpdated} />
            </Flex>
        </Box>
    );
};

export default InfoPanel;
