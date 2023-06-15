import { Box } from "@mantine/core";
import React from "react";
import { RowSelectionState } from "@tanstack/table-core";
import { useSelectedRowsCountStyles } from "./SelectedRowsCount.styles";

export interface SelectedRowsCountProps {
    rowSelection?: RowSelectionState;
}

export default function SelectedRowsCount({ rowSelection }: SelectedRowsCountProps) {
    const { classes } = useSelectedRowsCountStyles();

    return (
        <Box className={classes.wrapper}>
            Выбрано: <span>{rowSelection ? Object.keys(rowSelection).length : 0}</span>
        </Box>
    );
}
