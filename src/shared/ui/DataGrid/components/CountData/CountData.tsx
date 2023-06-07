import { Box } from "@mantine/core";
import React from "react";
import { TPagination } from "@shared/types";
import { useCountDataStyles } from "./CountData.styles";
import { useCurrentPaginationData } from "../../utils";

export type TCountDataProps = {
    countName?: string;
    pagination?: TPagination;
};

export default function CountData({ countName, pagination }: TCountDataProps) {
    const paginationData = useCurrentPaginationData(pagination);
    const { classes } = useCountDataStyles();

    if (!countName) {
        return <></>;
    }

    return (
        <Box className={classes.wrapper}>
            {countName}: <span>{paginationData?.count || 0}</span> из <span>{paginationData?.total || 0}</span>
        </Box>
    );
}
