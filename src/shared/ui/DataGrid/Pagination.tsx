import React from "react";
import { MRT_TableInstance } from "mantine-react-table";

import { Pagination as MPagination, Flex, NativeSelect, Box, Text } from "@mantine/core";
import { useRouter } from "next/router";

export interface Props<T extends Record<string, any>> {
    table: MRT_TableInstance<T>;
}

export default function Pagination<T extends Record<string, any>>({ table }: Props<T>) {
    const { setPageIndex, getPageCount, setPageSize, getState } = table;

    const {
        pagination: { pageIndex = 0, pageSize = 10 },
    } = getState();
    const router = useRouter();

    const pushOnPage = (selectedPage: number) => {
        setPageIndex(selectedPage);
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, page: `${selectedPage}` },
            },
            undefined,
            { shallow: true }
        );
    };

    return (
        <Flex justify="space-between" align="center" gap="lg" py="xs" px="sm">
            <Box>
                <Text>{`${pageSize * getPageCount()}`}</Text>
            </Box>
            <MPagination total={getPageCount()} page={pageIndex} size="md" onChange={pushOnPage} withControls={false} />
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
