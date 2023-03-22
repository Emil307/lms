import React from "react";
import { MRT_TableInstance } from "mantine-react-table";

import { Pagination as MPagination, Flex, NativeSelect, Box, Text, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";

export interface Pagination<T extends Record<string, any>> {
    table: MRT_TableInstance<T>;
    firstElemIndex?: number;
    lastElemIndex?: number;
    count?: number;
}

export default function Pagination<T extends Record<string, any>>({ table, firstElemIndex, lastElemIndex, count }: Pagination<T>) {
    const { setPageIndex, getPageCount, setPageSize, getState } = table;
    const router = useRouter();
    const theme = useMantineTheme();
    const {
        pagination: { pageIndex = 0, pageSize = Number(router.query.perPage) ?? 10 },
    } = getState();
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

    const pushOnPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value));
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, perPage: `${e.target.value}` },
            },
            undefined,
            { shallow: true }
        );
    };

    return (
        <Flex justify="space-between" align="center" gap="lg" py="xs" px="sm">
            <Box>
                <Text
                    sx={{
                        span: {
                            color: theme.colors.gray45[0],
                        },
                    }}>
                    {`${firstElemIndex}-${lastElemIndex}`} <span>из</span> {`${count ?? ""}`}
                </Text>
            </Box>
            <MPagination
                total={getPageCount()}
                sx={{
                    // backgroundColor: "red",
                    button: {
                        width: 48,
                        height: 48,
                        fontSize: 16,
                        lineHeight: "24px",
                        ":hover, &[data-active]": {
                            backgroundColor: theme.colors.dark[0],
                            color: theme.colors.white[0],
                        },
                    },
                }}
                page={pageIndex}
                onChange={pushOnPage}
                withControls={false}
            />
            <NativeSelect
                label="На странице"
                data={["5", "10", "15"]}
                value={pageSize.toString()}
                onChange={pushOnPerPage}
                sx={{
                    cursor: "pointer",
                    label: {
                        fontSize: 14,
                        lineHeight: "16px",
                        color: theme.colors.gray45[0],
                    },
                    select: {
                        border: "none"
                    },
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
