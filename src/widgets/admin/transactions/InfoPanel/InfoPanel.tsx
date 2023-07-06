import { Badge, Box, BoxProps, Flex, Title } from "@mantine/core";
import React from "react";
import dayjs from "dayjs";
import { useAdminTransaction } from "@entities/transaction";
import useStyles from "./InfoPanel.styles";

export interface InfoPanelProps extends BoxProps {
    id: string;
}

const InfoPanel = ({ id, ...props }: InfoPanelProps) => {
    const { data: transactionData } = useAdminTransaction({ id });
    const { classes } = useStyles({ status: transactionData?.status });

    return (
        <Box {...props}>
            <Flex gap={16} align="center">
                <Title order={1} color="dark">
                    {transactionData?.entity.name}
                </Title>
                <Badge variant="outline" className={classes.status}>
                    {transactionData?.status.name}
                </Badge>
            </Flex>

            <Flex mt={24} gap={32} align="center">
                <Box className={classes.infoItem}>
                    ID: <span>{transactionData?.id}</span>
                </Box>
                <Box className={classes.infoItem}>
                    Создание: <span>{transactionData?.createdAt ? dayjs(transactionData.createdAt).format("DD.MM.YYYY HH:mm") : "-"}</span>
                </Box>
            </Flex>
        </Box>
    );
};

export default InfoPanel;