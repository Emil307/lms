import { Box } from "@mantine/core";
import React from "react";
import { RowSelectionState } from "@tanstack/table-core";

export interface SelectedRowsCountProps {
    rowSelection?: RowSelectionState;
}

export default function SelectedRowsCount({ rowSelection }: SelectedRowsCountProps) {
    return (
        <Box
            sx={(theme) => ({
                color: theme.colors.gray45[0],
                lineHeight: "16px",
                span: {
                    color: theme.colors.dark[0],
                },
            })}
            mt={32}>
            Выбрано: <span>{rowSelection ? Object.keys(rowSelection).length : 0}</span>
        </Box>
    );
}
