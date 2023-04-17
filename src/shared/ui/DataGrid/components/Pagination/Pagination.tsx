import React from "react";
import { MRT_TableInstance } from "mantine-react-table";
import { Pagination as MPagination, Flex, NativeSelect, Box, Text } from "@mantine/core";
import { TPagination } from "@shared/types";
import { useTablePagination } from "../../utils";
import { usePaginationStyles } from "./Pagination.styles";

export type TPaginationProps<T extends Record<string, any>> = {
    table: MRT_TableInstance<T>;
    data?: TPagination;
    perPageOptions?: string[];
};

export default function Pagination<T extends Record<string, any>>(props: TPaginationProps<T>) {
    const { table, data, perPageOptions = ["5", "10", "15"] } = props;
    const { getPageCount } = table;
    const { firstElemIndex, lastElemIndex, pageIndex, pageSize, handleChangePage, handleChangePerPage } = useTablePagination<T>({
        table,
        data,
    });

    const { classes } = usePaginationStyles();

    if (!data) {
        return null;
    }

    return (
        <Flex justify="space-between" align="center" gap="lg" py="xs" px="sm">
            <Box>
                <Text className={classes.elementsCount}>
                    {`${firstElemIndex}-${lastElemIndex}`} <span>из</span> {data.total}
                </Text>
            </Box>
            {data.total_pages > 1 && (
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
                label="На странице"
                data={perPageOptions}
                value={pageSize.toString()}
                onChange={handleChangePerPage}
            />
        </Flex>
    );
}
