import { Badge, Box, BoxProps, Flex } from "@mantine/core";
import React from "react";
import dayjs from "dayjs";
import { useAdminTransaction } from "@entities/transaction";
import { Heading, Paragraph } from "@shared/ui";
import useStyles from "./InfoPanel.styles";

export interface InfoPanelProps extends Omit<BoxProps, "children"> {
    id: string;
}

const InfoPanel = ({ id, ...props }: InfoPanelProps) => {
    const { data: transactionData } = useAdminTransaction({ id });
    const { classes } = useStyles({ status: transactionData?.status });

    return (
        <Box {...props}>
            <Flex className={classes.headingContainer}>
                <Heading>{`Транзакция №${transactionData?.id}`}</Heading>
                <Badge className={classes.status}>{transactionData?.status.name}</Badge>
            </Flex>
            <Flex className={classes.infoPanelListInfo}>
                <Flex gap={8}>
                    <Paragraph variant="text-small-m" color="neutralMain50">
                        ID:
                    </Paragraph>
                    <Paragraph variant="text-small-m">{transactionData?.id}</Paragraph>
                </Flex>
                <Flex gap={8}>
                    <Paragraph variant="text-small-m" color="neutralMain50">
                        Создание:
                    </Paragraph>
                    <Paragraph variant="text-small-m">
                        {transactionData?.createdAt ? dayjs(transactionData.createdAt).format("DD.MM.YYYY HH:mm") : "-"}
                    </Paragraph>
                </Flex>
            </Flex>
        </Box>
    );
};

export default InfoPanel;
