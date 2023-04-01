import { Box, CSSObject, useMantineTheme } from "@mantine/core";
import React from "react";
import { MRT_Cell } from "mantine-react-table";
import BaseDataGrid, { BaseDataGridProps } from "./BaseDataGrid";
import { DataGridResponse } from "./types";
import { useManagedDataGridStyles } from "./ManagedDataGrid.styles";

type ExtendedProps<T extends Record<string, any>> = React.PropsWithChildren<Omit<BaseDataGridProps<T>, "data" | "key">>;

export interface ManagedDataGridProps<T extends Record<string, any>> extends ExtendedProps<T> {
    getData: (params: any) => Promise<DataGridResponse<T>>;
    countName?: string;
    data: T[];
    onClickCell?: (cell: MRT_Cell<T>) => void;
    getStylesForCell?: (cell: MRT_Cell<T>) => CSSObject;
    total?: number;
    perPage?: number;
}

export default function DataGrid<T extends Record<string, any>>({
    children,
    countName,
    total,
    perPage,
    data,
    onClickCell,
    getStylesForCell,
    ...rest
}: ManagedDataGridProps<T>) {
    const { classes } = useManagedDataGridStyles();
    const theme = useMantineTheme();

    return (
        <>
            {children}
            {countName && perPage && total && (
                <Box
                    sx={{
                        color: theme.colors.gray45[0],
                        lineHeight: "16px",
                        span: {
                            color: theme.colors.dark[0],
                        },
                    }}
                    mt={32}>
                    {countName}: <span>{perPage}</span> из <span>{total}</span>
                </Box>
            )}
            <Box mt={24}>
                <BaseDataGrid<T>
                    {...rest}
                    data={data}
                    manualSorting
                    enableFilters={rest.enableFilters || false}
                    enableColumnActions={rest.enableColumnActions || false}
                    manualPagination
                    mantineTableHeadRowProps={{
                        className: classes.tableHeadRow,
                    }}
                    mantineTableHeadCellProps={{
                        className: classes.tableHeadCell,
                    }}
                    mantineColumnActionsButtonProps={{
                        className: classes.columnActionsButton,
                    }}
                    mantinePaperProps={{
                        className: classes.paper,
                    }}
                    mantineTableContainerProps={{
                        className: classes.tableContainer,
                    }}
                    mantineTableBodyRowProps={{ className: classes.tableBodyRow }}
                    mantineTableBodyCellProps={({ cell }) => {
                        return {
                            className: classes.tableBodyCell,
                            onClick: () => {
                                if (!onClickCell) return;
                                onClickCell(cell);
                            },
                            sx: () => {
                                if (!getStylesForCell) return {};
                                return { ...getStylesForCell(cell) };
                            },
                        };
                    }}
                    mantineSelectAllCheckboxProps={{
                        className: classes.selectCheckbox,
                    }}
                    mantineSelectCheckboxProps={{
                        className: classes.selectCheckbox,
                    }}
                />
            </Box>
        </>
    );
}
