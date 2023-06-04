import { Box } from "@mantine/core";
import React from "react";
import { TPagination } from "@shared/types";
import { useCountDataStyles } from "./CountData.styles";

export type TCountDataProps = {
    countName?: string;
    pagination?: TPagination;
};

export default function CountData({ countName, pagination }: TCountDataProps) {
    const { classes } = useCountDataStyles();

    if (!countName || !pagination) {
        return <></>;
    }

    return (
        <Box className={classes.wrapper}>
            {countName}: <span>{pagination.count}</span> из <span>{pagination.total}</span>
        </Box>
    );
}
