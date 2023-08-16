import { Box, BoxProps, Flex } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { Checkbox, Heading, LastUpdatedInfo, Paragraph, Switch } from "@shared/ui";
import { useDetailsUser, useUpdateUserActivity, useUpdateUserStatic } from "@entities/user";
import { checkRoleOrder, getFullName } from "@shared/utils";
import { useSession } from "@features/auth";
import { Roles } from "@app/routes";
import { useInfoPanelStyles } from "./InfoPanel.styles";

export interface InfoPanelProps extends BoxProps {
    id: string;
}

const InfoPanel = ({ id, ...props }: InfoPanelProps) => {
    const { classes } = useInfoPanelStyles();
    const { data } = useDetailsUser(id);
    const { user: authUser } = useSession();

    const fio = getFullName({ data: data?.profile });
    const { mutate: updateActivityStatus } = useUpdateUserActivity({ id, fio });
    const { mutate: updateStaticStatus } = useUpdateUserStatic({ id, fio });

    const isRoleOrder = checkRoleOrder(authUser?.roles[0].id, data?.roles[0].id) > 0 || authUser?.id === data?.id;

    const labelActivitySwitch = data?.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);
    const handleChangeStaticStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateStaticStatus(newValue.target.checked);

    return (
        <Box {...props}>
            <Heading mb={24}>{fio}</Heading>
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
                        label={labelActivitySwitch}
                        labelPosition="left"
                        checked={data?.isActive}
                        onChange={handleChangeActiveStatus}
                        disabled={!isRoleOrder}
                    />
                </Flex>
                {Roles.teacher === data?.roles[0].id && (
                    <Checkbox
                        label="Отображать на главной"
                        checked={data.isStatic}
                        onChange={handleChangeStaticStatus}
                        className={classes.checkboxStatic}
                    />
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
