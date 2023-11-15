import { MantineReactTable, MantineReactTableProps, MRT_Cell } from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru";
import React, { ReactNode, useMemo } from "react";
import { CSSObject, MantineTheme, useMantineTheme, Text } from "@mantine/core";
import { ColumnSort, RowSelectionState, SortingState, Updater } from "@tanstack/table-core";
import { TPagination } from "@shared/types";
import { Tooltip } from "@shared/ui";
import { PAGE_DEFAULT, PER_PAGE_OPTIONS_DEFAULT } from "@shared/ui/DataGrid/constants";
import { useBaseTableStyles, getStylesForCell } from "./BaseTable.styles";
import { prepareColumns, useCurrentPaginationData } from "../../utils";
import { Pagination, TPaginationProps } from "../../components";
import { TCellBadge, TCellProps, TColumns } from "../../types";

type TExtendedProps<T extends Record<string, any>> = Omit<MantineReactTableProps<T>, "columns" | "data"> &
    Partial<Pick<TPaginationProps<T>, "perPageOptions">>;

export type TBaseTableProps<T extends Record<string, any>> = {
    data?: T[];
    columns: TColumns<T>;
    pagination?: TPagination;
    disablePagination?: boolean;
    isLoading: boolean;
    sorting?: SortingState;
    rowSelection?: RowSelectionState;
    onClickCell?: (cell: MRT_Cell<T>) => void;
    disableClickCell?: boolean;
    stylesForCell?: (cell: MRT_Cell<T>, theme: MantineTheme) => CSSObject;
    renderBadge?: (row: MRT_Cell<T>) => TCellBadge[];
    accessRole?: number;
} & TExtendedProps<T>;

function BaseTable<T extends Record<string, any>>({
    data = [],
    onClickCell,
    disableClickCell,
    stylesForCell,
    pagination,
    disablePagination = false,
    perPageOptions = PER_PAGE_OPTIONS_DEFAULT,
    isLoading,
    sorting,
    onSortingChange,
    rowSelection,
    renderBadge,
    accessRole = 0,
    ...rest
}: TBaseTableProps<T>) {
    const theme = useMantineTheme();
    const { classes } = useBaseTableStyles({ hasActionButton: rest.initialState?.columnOrder?.includes("mrt-row-actions") });
    const columns = prepareColumns(rest.columns, accessRole) || [];
    const paginationData = useCurrentPaginationData(pagination);
    const rowCount = paginationData?.count;
    const totalPage = paginationData?.totalPages || 0;

    const handleClickCell = (cell: MRT_Cell<T>) => {
        if (disableClickCell) {
            return;
        }
        if (cell.column.id === "mrt-row-actions") {
            return;
        }
        if (cell.column.id === "mrt-row-select") {
            return;
        }
        onClickCell && onClickCell(cell);
    };

    const handleSortingChange = (updater: Updater<ColumnSort[]>) => {
        if (disablePagination || (paginationData?.total && paginationData.total > 1)) {
            onSortingChange && onSortingChange(updater);
        }
    };

    const wrappedColumns = useMemo(() => {
        const getCellValue = (props: TCellProps<T>, Cell?: (arg0: TCellProps<T>) => any): ReactNode => {
            return Cell ? Cell(props) : (props.cell.getValue() as ReactNode);
        };

        const renderContent = (cellValue: ReactNode) => {
            return (
                <Tooltip label={cellValue} position="top">
                    <Text className={classes.tableBodyCellValue}>{cellValue}</Text>
                </Tooltip>
            );
        };

        return columns.map(({ Cell, ...column }) => ({
            ...column,
            Cell: (props: TCellProps<T>) => {
                const cellValue = getCellValue(props, Cell);
                return (
                    <div className={classes.tableBodyCellValueWrapper} style={{ width: column.size ? column.size - 32 : "100%" }}>
                        {renderContent(cellValue)}
                    </div>
                );
            },
        }));
    }, [columns]);

    return (
        <MantineReactTable<T>
            {...rest}
            data={data}
            columns={wrappedColumns}
            rowCount={rowCount}
            pageCount={totalPage}
            renderBottomToolbar={({ table }) => {
                if (!disablePagination) {
                    return <Pagination<T> table={table} data={paginationData} perPageOptions={perPageOptions} />;
                }
            }}
            state={{
                isLoading,
                sorting,
                pagination: {
                    pageIndex: paginationData?.currentPage || PAGE_DEFAULT,
                    pageSize: paginationData?.perPage || perPageOptions[1],
                },
                rowSelection,
            }}
            onSortingChange={handleSortingChange}
            sortDescFirst
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
                const cellBadges = renderBadge ? renderBadge(cell) : false;
                const { classes } = getStylesForCell({
                    cellBadges,
                    columnId: cell.column.id,
                });
                return {
                    className: classes.tableBodyCell,
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
