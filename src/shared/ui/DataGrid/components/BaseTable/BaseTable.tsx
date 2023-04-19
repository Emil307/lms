import { MantineReactTable, MantineReactTableProps, MRT_Cell } from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru";
import React from "react";
import { CSSObject, MantineTheme, useMantineTheme } from "@mantine/core";
import { TPagination } from "@shared/types";
import { useBaseTableStyles, getStylesForCell } from "./BaseTable.styles";
import { prepareColumns, useTableSort } from "../../utils";
import { Pagination } from "../../components";

export type TBaseTableProps<T extends Record<string, any>> = Omit<MantineReactTableProps<T>, "columns" | "data"> & {
    data?: T[];
    columns?: MantineReactTableProps<T>["columns"];
    pagination?: TPagination;
    perPageOptions?: string[];
    isLoading: boolean;
    onClickCell?: (cell: MRT_Cell<T>) => void;
    stylesForCell?: (cell: MRT_Cell<T>, theme: MantineTheme) => CSSObject;
    renderActiveBadge?: (row: MRT_Cell<T>) => boolean;
};

function BaseTable<T extends Record<string, any>>({
    data = [],
    onClickCell,
    stylesForCell,
    pagination,
    perPageOptions,
    isLoading,
    renderActiveBadge = () => false,
    ...rest
}: TBaseTableProps<T>) {
    const theme = useMantineTheme();
    const { classes } = useBaseTableStyles();
    const columns = rest.columns || prepareColumns(data);
    const rowCount = pagination?.count;
    const totalPage = pagination?.total_pages || 0;

    const { sorting, setSorting } = useTableSort();

    const handleClickCell = (cell: MRT_Cell<T>) => {
        if (cell.column.id === "mrt-row-actions") {
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
                    pageIndex: pagination?.current_page || 0,
                    pageSize: pagination?.per_page || 10,
                },
            }}
            onSortingChange={setSorting}
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
                const isActiveCell = renderActiveBadge(cell);
                const cellClassName = getStylesForCell({ isActive: isActiveCell }).classes.tableBodyCell;
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
