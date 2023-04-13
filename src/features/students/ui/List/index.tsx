import { Box, Flex } from "@mantine/core";
import { useState } from "react";
import { FormikConfig } from "formik";
import { MRT_Cell, MRT_SortingState } from "mantine-react-table";
import { useRouter } from "next/router";
import { DataGrid, Form, FSearch, FSelect } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { TUser } from "@entities/user/api/types";
import { useAdminUsers, useAdminStudentsFilters } from "@entities/user";
import Pagination from "@shared/ui/DataGrid/Pagination";
import { StudentsListMenu } from "./components/ListMenu";
import { TStudentListFilters } from "./types";
import { columns, getStylesForCell, radioGroupValues } from "./constant";

const List = () => {
    const router = useRouter();
    const { page, perPage, isActive, roleName, query } = router.query as {
        page?: string;
        perPage?: string;
        isActive?: "1" | "0" | "";
        roleName?: string;
        query?: string;
    };
    const [sorting, setSorting] = useState<MRT_SortingState>([]);

    const studentFilters = useAdminStudentsFilters();

    const rolesSelectOption = studentFilters.data?.roles.map((item) => ({
        value: item.name,
        label: item.displayName,
    }));

    const { data, isLoading, isRefetching, isFetching } = useAdminUsers({
        query: query ?? "",
        filters: {
            ...(isActive && { isActive: isActive }),
            ...(roleName ? { roleName: roleName } : { roleName: rolesSelectOption?.[0].value }),
        },
        sorting,
        perPage: perPage ? Number(perPage) : 10,
        page: page ? Number(page) : 1,
    });

    const totalPage = data?.meta.pagination.total_pages;
    const firstElemIndex = (data?.meta.pagination.per_page ?? 0) * ((data?.meta.pagination.current_page ?? 0) - 1) + 1;
    const lastElemIndex =
        (data?.meta.pagination.per_page ?? 0) * ((data?.meta.pagination.current_page ?? 0) - 1) + (data?.meta.pagination.count ?? 0);

    const openUserDetailPage = (id: number) => router.push({ pathname: "/admin/students/[id]", query: { id: String(id) } });

    const handlerClickCell = (cell: MRT_Cell<TUser>) => {
        if (cell.column.id === "mrt-row-actions") return;
        openUserDetailPage(cell.row.original.id);
    };

    const cfg: FormikConfig<TStudentListFilters> = {
        initialValues: { isActive: isActive ?? "", query: query ?? "", role: roleName || "" },
        enableReinitialize: true,
        onSubmit: (values) => {
            router.push(
                {
                    pathname: router.pathname,
                    query: { ...router.query, isActive: values.isActive, roleName: values.role, query: values.query, page: "1" },
                },
                undefined,
                { shallow: true }
            );
        },
    };

    return (
        <Box mt={24}>
            <DataGrid<TUser>
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
                countName="Учеников"
                count={data?.meta.pagination.count}
                total={data?.meta.pagination.total}
                initialState={{
                    columnOrder: ["id", "fullName", "roleName", "email", "isActive", "mrt-row-actions"],
                }}
                enablePinning
                renderRowActions={({ row }) => <StudentsListMenu row={row} />}
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
                    {({ dirty, resetForm }) => (
                        <Box mb={24}>
                            <Flex columnGap={8} rowGap={0}>
                                <FSearch w={380} size="sm" name="query" placeholder="Поиск" />
                                <FSelect
                                    name="role"
                                    size="sm"
                                    data={rolesSelectOption ?? []}
                                    clearable
                                    label="Роль"
                                    disabled={studentFilters.isLoading}
                                />
                            </Flex>
                            <Box mt={16}>
                                <FRadioGroup name="isActive" defaultValue="">
                                    {radioGroupValues.map((item) => (
                                        <Radio size="md" key={item.id} label={item.label} value={item.value} />
                                    ))}
                                </FRadioGroup>
                            </Box>
                            <Flex gap={16} mt={16}>
                                <Button type="submit" w="100%" maw={164}>
                                    Найти
                                </Button>
                                {dirty && (
                                    <Button type="button" variant="white" onClick={resetForm} w="100%" maw={164}>
                                        Cбросить
                                    </Button>
                                )}
                            </Flex>
                        </Box>
                    )}
                </Form>
            </DataGrid>
        </Box>
    );
};

export default List;
