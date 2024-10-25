import { Box, BoxProps, Flex } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { Heading, LastUpdatedInfo, Paragraph, Switch } from "@shared/ui";
import { useDetailsUser, useUpdateUserActivity } from "@entities/user";
import { checkRoleOrder, getFullName } from "@shared/utils";
import { useSession } from "@entities/auth";
import { useInfoPanelStyles } from "./InfoPanel.styles";

export interface InfoPanelProps extends BoxProps {
    id: string;
}

const InfoPanel = ({ id, ...props }: InfoPanelProps) => {
    const { classes } = useInfoPanelStyles();
    const { data } = useDetailsUser(id);

    const { user } = useSession();

    const isRoleOrder = checkRoleOrder(user?.roles[0].id, data?.roles[0].id) >= 0;

    const fio = getFullName({ data: data?.profile });
    const { mutate: updateActivityStatus } = useUpdateUserActivity({ id, fio });

    const labelActivitySwitch = data?.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    return (
        <Box {...props}>
            <Heading mb={24}>{fio}</Heading>
            <Flex className={classes.infoPanelListInfo}>
                <Flex gap={8}>
                    <Paragraph variant="text-small-m" color="neutralMain50">
                        ID:
                    </Paragraph>
                    <Paragraph variant="text-small-m">{data?.id}</Paragraph>
                </Flex>

                {isRoleOrder && user?.id !== data?.id && (
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
                            disabled={!isRoleOrder}
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
                <LastUpdatedInfo data={data?.lastUpdated} />
            </Flex>
        </Box>
    );
};

export default InfoPanel;
