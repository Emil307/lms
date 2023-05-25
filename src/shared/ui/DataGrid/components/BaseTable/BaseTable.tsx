import { MantineReactTable, MantineReactTableProps, MRT_Cell } from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru";
import React from "react";
import { CSSObject, MantineTheme, useMantineTheme } from "@mantine/core";
import { RowSelectionState, SortingState } from "@tanstack/table-core";
import { TPagination } from "@shared/types";
import { useBaseTableStyles, getStylesForCell } from "./BaseTable.styles";
import { prepareColumns } from "../../utils";
import { Pagination, TPaginationProps } from "../../components";

type TExtendedProps<T extends Record<string, any>> = Omit<MantineReactTableProps<T>, "columns" | "data"> &
    Pick<TPaginationProps<T>, "perPageOptions">;

export type TBaseTableProps<T extends Record<string, any>> = {
    data?: T[];
    columns?: MantineReactTableProps<T>["columns"];
    pagination?: TPagination;
    perPageOptions?: string[];
    isLoading: boolean;
    sorting?: SortingState;
    rowSelection?: RowSelectionState;
    onClickCell?: (cell: MRT_Cell<T>) => void;
    stylesForCell?: (cell: MRT_Cell<T>, theme: MantineTheme) => CSSObject;
    renderActiveBadge?: (row: MRT_Cell<T>) => boolean;
    getSelectedRows?: () => void;
} & TExtendedProps<T>;

function BaseTable<T extends Record<string, any>>({
    data = [],
    onClickCell,
    stylesForCell,
    pagination,
    perPageOptions,
    isLoading,
    sorting,
    rowSelection,
    renderActiveBadge,
    ...rest
}: TBaseTableProps<T>) {
    const theme = useMantineTheme();
    const { classes } = useBaseTableStyles();
    const columns = rest.columns || prepareColumns(data);
    const rowCount = pagination?.count;
    const totalPage = pagination?.totalPages || 0;

    const handleClickCell = (cell: MRT_Cell<T>) => {
        if (cell.column.id === "mrt-row-actions") {
            return;
        }
        if (cell.column.id === "mrt-row-select") {
            return;
        }
        onClickCell && onClickCell(cell);
    };

    return (
        <MantineReactTable<T>
            {...rest}
            data={data}
            columns={columns}
            rowCount={rowCount}
            pageCount={totalPage}
            renderBottomToolbar={({ table }) => {
                return <Pagination<T> table={table} data={pagination} perPageOptions={perPageOptions} />;
            }}
            state={{
                isLoading,
                sorting,
                pagination: {
                    pageIndex: pagination?.currentPage || 0,
                    pageSize: pagination?.perPage || 10,
                },
                rowSelection,
            }}
            enableSelectAll
            enableRowSelection
            enableDensityToggle={false}
            localization={MRT_Localization_RU}
            enableTopToolbar={false}
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
                const isActiveCell = renderActiveBadge ? renderActiveBadge(cell) : false;
                const cellClassName = getStylesForCell({ renderActive: !!renderActiveBadge, isActive: isActiveCell }).classes.tableBodyCell;
                return {
                    className: cellClassName,
                    onClick: () => {
                        handleClickCell(cell);
                    },
                    sx: () => {
                        if (!stylesForCell) return {};
                        return { ...stylesForCell(cell, theme) };
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
    );
}

export default BaseTable;
