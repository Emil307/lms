import { Box, Flex, Title } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { useState } from "react";
import { FormikConfig } from "formik";
import { MRT_Cell, MRT_SortingState } from "mantine-react-table";
import { useRouter } from "next/router";
import { DataGrid, Form, FSearch } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import Pagination from "@shared/ui/DataGrid/Pagination";
import { Group, useAdminGroups } from "@entities/group";
import { columns, getStylesForCell, radioGroupValues } from "./constants";
import { GroupsListMenu } from "./components";
import { TGroupListFilters } from "./types";

const GroupList = () => {
    const router = useRouter();
    const { page, perPage, isActive, query } = router.query as {
        page?: string;
        perPage?: string;
        isActive?: "1" | "0" | "";
        query?: string;
    };

    const [sorting, setSorting] = useState<MRT_SortingState>([]);

    const { data, isLoading, isRefetching, isFetching } = useAdminGroups({
        query: query ?? "",
        filters: {
            ...(isActive && { isActive: isActive }),
        },
        sorting,
        perPage: perPage ? Number(perPage) : 10,
        page: page ? Number(page) : 1,
    });

    const totalPage = data?.meta.pagination.total_pages;
    const firstElemIndex = (data?.meta.pagination.per_page ?? 0) * ((data?.meta.pagination.current_page ?? 0) - 1) + 1;
    const lastElemIndex =
        (data?.meta.pagination.per_page ?? 0) * ((data?.meta.pagination.current_page ?? 0) - 1) + (data?.meta.pagination.count ?? 0);

    const openGroupDetail = (id: number) => {
        router.push({ pathname: "/admin/groups/[id]", query: { id: String(id) } });
    };

    const handlerClickCell = (cell: MRT_Cell<Group>) => {
        if (cell.column.id === "mrt-row-actions") return;
        openGroupDetail(cell.row.original.id);
    };

    const cfg: FormikConfig<TGroupListFilters> = {
        initialValues: { isActive: isActive ?? "", query: query ?? "" },
        enableReinitialize: true,
        onSubmit: async (values) => {
            router.push(
                {
                    pathname: router.pathname,
                    query: { ...router.query, isActive: values.isActive, query: values.query, page: "1" },
                },
                undefined,
                { shallow: true }
            );
        },
    };

    const pushOnCreateOrder = () => router.push("/admin/groups/create");

    return (
        <Box>
            <Flex align="center" justify="space-between">
                <Title order={1} color="dark">
                    Группы
                </Title>
                <Button onClick={pushOnCreateOrder} variant="secondary" size="large" leftIcon={<PlusCircle />}>
                    Создать группу
                </Button>
            </Flex>

            <Box mt={24}>
                <DataGrid<Group>
                    getStylesCell={getStylesForCell}
                    manualSorting
                    onSortingChange={setSorting}
                    onClickCell={handlerClickCell}
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
                    countName="Пользователей"
                    count={data?.meta.pagination.count}
                    total={data?.meta.pagination.total}
                    initialState={{
                        columnOrder: [
                            "id",
                            "courseName",
                            "createdAt",
                            "name",
                            "students",
                            "education",
                            "teacherFullName",
                            "status",
                            "isActive",
                            "mrt-row-actions",
                        ],
                    }}
                    enablePinning
                    renderRowActions={({ row }) => {
                        return <GroupsListMenu row={row} />;
                    }}
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
                        <Box mb={24}>
                            <Flex columnGap={8} rowGap={0}>
                                <FSearch w={380} size="sm" name="query" placeholder="Поиск" />
                                {/* TODO: Когда будет эндпоинт с фильтрами */}
                            </Flex>
                            <Box mt={16}>
                                <FRadioGroup name="isActive" defaultValue="">
                                    {radioGroupValues.map((item) => {
                                        return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                                    })}
                                </FRadioGroup>
                            </Box>
                            <Button mt={16} type="submit">
                                Найти
                            </Button>
                        </Box>
                    </Form>
                </DataGrid>
            </Box>
        </Box>
    );
};

export default GroupList;
