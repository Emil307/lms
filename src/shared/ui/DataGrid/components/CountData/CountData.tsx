import { TPagination } from "@shared/types";
import { Box, useMantineTheme } from "@mantine/core";
import React from "react";

export type TCountDataProps = {
    countName?: string;
    pagination?: TPagination;
};

export default function CountData({ countName, pagination }: TCountDataProps) {
    const theme = useMantineTheme();

    if (!countName || !pagination) {
        return <></>;
    }

    return (
        <Box
            sx={{
                color: theme.colors.gray45[0],
                lineHeight: "16px",
                span: {
                    color: theme.colors.dark[0],
                },
            }}
            mt={32}>
            {countName}: <span>{pagination.count}</span> из <span>{pagination.total}</span>
        </Box>
    );
}
