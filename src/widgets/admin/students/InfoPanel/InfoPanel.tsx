import { Box, BoxProps, Flex } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { Heading, LastUpdatedInfo, Paragraph, Switch } from "@shared/ui";
import { getFullName } from "@shared/utils";
import { useDetailsStudent, useUpdateUserActivity } from "@entities/user";
import { useUserRole } from "@entities/auth/hooks";
import { Roles } from "@shared/types";
import useStyles from "./InfoPanel.styles";

export interface InfoPanelProps extends Omit<BoxProps, "children"> {
    id: string;
}

const InfoPanel = ({ id, ...props }: InfoPanelProps) => {
    const { classes } = useStyles();

    const userRole = useUserRole();

    const { data } = useDetailsStudent(id);

    const userFullname = getFullName({ data: data?.profile });

    const { mutate: updateActivityStatus } = useUpdateUserActivity({ id, fio: userFullname });

    const labelActivitySwitch = data?.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    return (
        <Box {...props}>
            <Heading mb={24}>{userFullname}</Heading>
            <Flex className={classes.infoPanelListInfo}>
                <Flex gap={8}>
                    <Paragraph variant="text-small-m" color="neutralMain50">
                        ID:
                    </Paragraph>
                    <Paragraph variant="text-small-m">{data?.id}</Paragraph>
                </Flex>

                {userRole?.name !== Roles.teacher && (
                    <Flex align="center" gap={8}>
                        <Paragraph variant="text-small-m" color="neutralMain50">
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
                    <Paragraph variant="text-small-m" color="neutralMain50">
                        Последний вход:
                    </Paragraph>
                    <Paragraph variant="text-small-m">
                        {data?.lastLoginAt ? dayjs(data.lastLoginAt).format("DD.MM.YYYY HH:mm") : "-"}
                    </Paragraph>
                </Flex>
                <LastUpdatedInfo data={data?.lastUpdated} hidden={userRole?.name === Roles.teacher} />
            </Flex>
        </Box>
    );
};

export default InfoPanel;
