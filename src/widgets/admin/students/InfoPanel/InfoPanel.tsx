import { Box, Flex } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { Heading, LastUpdatedInfo, Paragraph, Switch } from "@shared/ui";
import { getFullName } from "@shared/utils";
import { useDetailsUser, useUpdateUserActivity } from "@entities/user";

interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { data } = useDetailsUser(id);

    const userFullname = getFullName({ data: data?.profile });

    const { mutate: updateActivityStatus } = useUpdateUserActivity({ id, fio: userFullname });

    const labelActivitySwitch = data?.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateActivityStatus({ isActive: newValue.target.checked });

    return (
        <Box>
            <Heading mt={8}>{userFullname}</Heading>
            <Flex mt={24} gap={32} align="center">
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
