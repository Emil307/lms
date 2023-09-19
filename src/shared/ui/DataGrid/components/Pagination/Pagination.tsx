import React, { useMemo } from "react";
import { MRT_TableInstance } from "mantine-react-table";
import { Pagination as MPagination, Box } from "@mantine/core";
import { TPagination } from "@shared/types";
import { Paragraph } from "@shared/ui/Typography";
import { Select } from "@shared/ui";
import { usePaginationStyles } from "./Pagination.styles";
import { useTablePagination } from "../../utils";

export type TPaginationProps<T extends Record<string, any>> = {
    table: MRT_TableInstance<T>;
    data?: TPagination;
    perPageOptions: [number, number, ...number[]];
};

export default function Pagination<T extends Record<string, any>>(props: TPaginationProps<T>) {
    const { table, data, perPageOptions } = props;
    const { getPageCount } = table;
    const { firstElemIndex, lastElemIndex, pageIndex, pageSize, handleChangePage, handleChangePerPage } = useTablePagination<T>({
        table,
        data,
    });

    const { classes } = usePaginationStyles();

    const perPageSelectOptions = useMemo(() => {
        return perPageOptions.map((option) => ({
            label: String(option),
            value: String(option),
        }));
    }, [perPageOptions]);

    if (!data || !data.total) {
        return null;
    }

    return (
        <Box className={classes.root}>
            <Box className={classes.elementsCount}>
                <Paragraph variant="text-small-m" component="span">{`${firstElemIndex}-${lastElemIndex}`}</Paragraph>
                <Paragraph variant="text-small-m" color="gray45">
                    {" из "}
                </Paragraph>
                <Paragraph variant="text-small-m" component="span">
                    {data.total}
                </Paragraph>
            </Box>
            {data.totalPages > 1 && (
                <MPagination
                    className={classes.paginationButtons}
                    total={getPageCount()}
                    page={pageIndex}
                    onChange={handleChangePage}
                    withControls={false}
                />
            )}
            <Select
                className={classes.perPageSelect}
                label="На странице:"
                data={perPageSelectOptions}
                value={pageSize.toString()}
                onChange={handleChangePerPage}
            />
        </Box>
    );
}
