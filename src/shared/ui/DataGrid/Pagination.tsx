import React from "react";
import { MRT_TableInstance } from "mantine-react-table";

import { Pagination as MPagination, Flex, NativeSelect, Box, Text } from "@mantine/core";

export interface Props<T extends Record<string, any>> {
    table: MRT_TableInstance<T>;
}

export default function Pagination<T extends Record<string, any>>({ table }: Props<T>) {
    const { setPageIndex, getPageCount, setPageSize, getState } = table;
    const {
        pagination: { pageIndex = 0, pageSize = 10 },
    } = getState();

    return (
        <Flex justify="space-between" align="center" gap="lg" py="xs" px="sm">
            <Box>
                <Text>{`${pageSize * getPageCount()}`}</Text>
            </Box>
            <MPagination
                total={getPageCount()}
                page={pageIndex + 1}
                size="md"
                onChange={(page) => setPageIndex(page - 1)}
                withControls={false}
            />
            <NativeSelect
                data={["5", "10"]}
                value={pageSize.toString()}
                onChange={(val) => {
                    setPageSize(Number(val.target.value));
                }}
                sx={{
                    "@media (min-width: 720px)": {
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    },
                    "& .mantine-Select-input": {
                        width: "90px",
                    },
                }}
            />
        </Flex>
    );
}
