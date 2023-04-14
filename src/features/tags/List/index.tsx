import { Box, Flex } from "@mantine/core";
import { useState } from "react";
import { FormikConfig } from "formik";
import { MRT_SortingState } from "mantine-react-table";
import { useRouter } from "next/router";
import { DataGrid, Form, FSearch } from "@shared/ui";
import { Button } from "@shared/ui";
import Pagination from "@shared/ui/DataGrid/Pagination";
import { AdminTag, useAdminTags } from "@entities/tag";
import { columnOrder, columns, getStylesForCell } from "./constant";
import { ListMenu } from "./components";
import { TTagsFilters } from "./types";

interface TRouterQueries {
    page?: string;
    perPage?: string;
    query?: string;
}

const List = () => {
    const router = useRouter();
    const { page, perPage, query } = router.query as TRouterQueries;
    const [sorting, setSorting] = useState<MRT_SortingState>([]);

    const { data, isLoading, isRefetching, isFetching } = useAdminTags({
        query: query ?? "",
        sorting,
        perPage: perPage ? Number(perPage) : 10,
        page: page ? Number(page) : 1,
    });

    const totalPage = data?.meta.pagination.total_pages;
    const firstElemIndex = (data?.meta.pagination.per_page ?? 0) * ((data?.meta.pagination.current_page ?? 0) - 1) + 1;
    const lastElemIndex =
        (data?.meta.pagination.per_page ?? 0) * ((data?.meta.pagination.current_page ?? 0) - 1) + (data?.meta.pagination.count ?? 0);

    const cfg: FormikConfig<TTagsFilters> = {
        initialValues: { query: query ?? "" },
        enableReinitialize: true,
        onSubmit: (values) => {
            router.push(
                {
                    pathname: router.pathname,
                    query: { ...router.query, query: values.query, page: "1" },
                },
                undefined,
                { shallow: true }
            );
        },
    };

    return (
        <Box mt={24}>
            <DataGrid<AdminTag>
                getStylesCell={getStylesForCell}
                manualSorting
                onSortingChange={setSorting}
                rowCount={data?.meta.pagination.count}
                state={{
                    isLoading: isLoading || isRefetching || isFetching,
                    pagination: {
                        pageIndex: data?.meta.pagination.current_page || 0,
                        pageSize: data?.meta.pagination.per_page || 10,
                    },
                    sorting,
                }}
                pageCount={totalPage || 0}
                columns={columns}
                data={data?.data ?? []}
                countName="Тегов"
                count={data?.meta.pagination.count}
                total={data?.meta.pagination.total}
                initialState={{
                    columnOrder,
                }}
                enablePinning
                renderRowActions={({ row }) => <ListMenu row={row} />}
                enableColumnFilterModes
                enableRowActions
                enableRowSelection
                renderBottomToolbar={({ table }) => {
                    if (!data?.meta.pagination) {
                        return null;
                    }
                    return <Pagination table={table} firstElemIndex={firstElemIndex} lastElemIndex={lastElemIndex} count={totalPage} />;
                }}>
                <Form config={cfg}>
                    {({ dirty }) => (
                        <Flex columnGap={16} rowGap={0}>
                            <FSearch w="100%" maw={512} size="sm" name="query" placeholder="Поиск" />
                            <Button type="submit" disabled={!dirty} w="100%" maw={164}>
                                Найти
                            </Button>
                        </Flex>
                    )}
                </Form>
            </DataGrid>
        </Box>
    );
};

export default List;
