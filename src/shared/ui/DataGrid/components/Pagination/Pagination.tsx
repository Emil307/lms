import React from "react";
import { MRT_TableInstance } from "mantine-react-table";
import { Pagination as MPagination, NativeSelect, Box, ThemeIcon } from "@mantine/core";
import { ChevronDown } from "react-feather";
import { TPagination } from "@shared/types";
import { Paragraph } from "@shared/ui/Typography";
import { usePaginationStyles } from "./Pagination.styles";
import { useTablePagination } from "../../utils";

export type TPaginationProps<T extends Record<string, any>> = {
    table: MRT_TableInstance<T>;
    data?: TPagination;
    perPageOptions: [string, string, ...string[]];
};

export default function Pagination<T extends Record<string, any>>(props: TPaginationProps<T>) {
    const { table, data, perPageOptions } = props;
    const { getPageCount } = table;
    const { firstElemIndex, lastElemIndex, pageIndex, pageSize, handleChangePage, handleChangePerPage } = useTablePagination<T>({
        table,
        data,
    });

    const { classes } = usePaginationStyles();

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
            <NativeSelect
                className={classes.perPageSelect}
                label="На странице:"
                data={perPageOptions}
                value={pageSize.toString()}
                onChange={handleChangePerPage}
                rightSection={
                    <ThemeIcon color="gray45" w={16} h={16}>
                        <ChevronDown />
                    </ThemeIcon>
                }
            />
        </Box>
    );
}
