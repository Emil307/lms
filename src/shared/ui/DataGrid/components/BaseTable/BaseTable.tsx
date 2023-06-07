import { MantineReactTable, MantineReactTableProps, MRT_Cell, MRT_Column, MRT_Row, MRT_TableInstance } from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru";
import React, { ReactNode, useMemo } from "react";
import { CSSObject, MantineTheme, useMantineTheme } from "@mantine/core";
import { RowSelectionState, SortingState } from "@tanstack/table-core";
import { TPagination } from "@shared/types";
import { useBaseTableStyles, getStylesForCell } from "./BaseTable.styles";
import { prepareColumns, useCurrentPaginationData } from "../../utils";
import { Pagination, TPaginationProps } from "../../components";

type TExtendedProps<T extends Record<string, any>> = Omit<MantineReactTableProps<T>, "columns" | "data"> &
    Partial<Pick<TPaginationProps<T>, "perPageOptions">>;

export type TBaseTableProps<T extends Record<string, any>> = {
    data?: T[];
    columns?: MantineReactTableProps<T>["columns"];
    pagination?: TPagination;
    isLoading: boolean;
    sorting?: SortingState;
    rowSelection?: RowSelectionState;
    onClickCell?: (cell: MRT_Cell<T>) => void;
    stylesForCell?: (cell: MRT_Cell<T>, theme: MantineTheme) => CSSObject;
    renderActiveBadge?: (row: MRT_Cell<T>) => boolean;
} & TExtendedProps<T>;

function BaseTable<T extends Record<string, any>>({
    data = [],
    onClickCell,
    stylesForCell,
    pagination,
    perPageOptions = ["5", "10", "15"],
    isLoading,
    sorting,
    rowSelection,
    renderActiveBadge,
    ...rest
}: TBaseTableProps<T>) {
    const theme = useMantineTheme();
    const { classes } = useBaseTableStyles({ hasActionButton: rest?.initialState?.columnOrder?.includes("mrt-row-actions") });
    const columns = rest.columns || prepareColumns(data);
    const paginationData = useCurrentPaginationData(pagination);
    const rowCount = paginationData?.count;
    const totalPage = paginationData?.totalPages || 0;

    const handleClickCell = (cell: MRT_Cell<T>) => {
        if (cell.column.id === "mrt-row-actions") {
            return;
        }
        if (cell.column.id === "mrt-row-select") {
            return;
        }
        onClickCell && onClickCell(cell);
    };

    const wrappedColumn = useMemo(() => {
        return columns.map(({ Cell, ...column }) => ({
            ...column,
            Cell: (props: {
                cell: MRT_Cell<T>;
                renderedCellValue: React.ReactNode;
                column: MRT_Column<T>;
                row: MRT_Row<T>;
                table: MRT_TableInstance<T>;
            }) => (
                <div className={classes.tableBodyCellValue} style={{ width: column.size ? column.size - 32 : "100%" }}>
                    {Cell ? Cell(props) : (props.cell.getValue() as ReactNode)}
                </div>
            ),
        }));
    }, [columns]);

    return (
        <MantineReactTable<T>
            {...rest}
            data={data}
            columns={wrappedColumn}
            rowCount={rowCount}
            pageCount={totalPage}
            renderBottomToolbar={({ table }) => {
                return <Pagination<T> table={table} data={paginationData} perPageOptions={perPageOptions} />;
            }}
            state={{
                isLoading,
                sorting,
                pagination: {
                    pageIndex: paginationData?.currentPage || 0,
                    pageSize: paginationData?.perPage || Number(perPageOptions[1]),
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
            mantineSkeletonProps={{
                className: classes.skeleton,
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
