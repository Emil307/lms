import { Box, CSSObject, Flex, ThemeIcon, Title, useMantineTheme } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { useState } from "react";
import { MRT_Cell, MRT_SortingState } from "mantine-react-table";
import { useRouter } from "next/router";
import { DataGrid } from "@shared/ui";
import { Button } from "@shared/ui";
import Pagination from "@shared/ui/DataGrid/Pagination";
import { Group, useAdminGroups } from "@entities/group";
import { columns } from "./constant";
import { ListMenu } from "./components";

const StudentList = () => {
    const router = useRouter();
    const { page, perPage } = router.query as {
        page?: string;
        perPage?: string;
        query?: string;
    };
    const theme = useMantineTheme();
    const [sorting, setSorting] = useState<MRT_SortingState>([]);

    //TODO: Таблица пока не настроена так как что касается учеников на стороне бекенда ничего нет
    const { data, isLoading, isRefetching, isFetching } = useAdminGroups({
        sorting,
        perPage: perPage ? Number(perPage) : 10,
        page: page ? Number(page) : 1,
    });

    const totalPage = data?.meta.pagination.total_pages;
    const firstElemIndex = (data?.meta.pagination.per_page ?? 0) * ((data?.meta.pagination.current_page ?? 0) - 1) + 1;
    const lastElemIndex =
        (data?.meta.pagination.per_page ?? 0) * ((data?.meta.pagination.current_page ?? 0) - 1) + (data?.meta.pagination.count ?? 0);

    const getStylesForCell = (cell: MRT_Cell<Group>): CSSObject => {
        return {
            ":first-of-type": {
                position: "relative",
                ":before": {
                    content: "''",
                    position: "absolute",
                    backgroundColor: cell.row.original.isActive ? theme.colors.done[0] : theme.colors.light[0],
                    width: 4,
                    borderRadius: "0 8px 8px 0",
                    height: "100%",
                    top: 1,
                    bottom: 1,
                    left: 0,
                },
            },
        };
    };

    const pushOnUserDetail = (id: number) => {
        router.push({ pathname: "/admin/users/[id]", query: { id: String(id) } });
    };

    const handlerClickCell = (cell: MRT_Cell<Group>) => {
        if (cell.column.id === "mrt-row-actions") return;
        pushOnUserDetail(cell.row.original.id);
    };

    //TODO: Таблица пока не настроена так как что касается учеников на стороне бекенда ничего нет

    return (
        <Box mt={24}>
            <DataGrid<Group>
                getStylesForCell={getStylesForCell}
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
                countName="Ученики"
                perPage={data?.meta.pagination.per_page}
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
                    return <ListMenu row={row} />;
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
                <Flex gap={48} align="center">
                    <Title order={2} color="dark">
                        Состав группы
                    </Title>
                    <Button
                        variant="text"
                        leftIcon={
                            <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                                <PlusCircle />
                            </ThemeIcon>
                        }>
                        Добавить ученика
                    </Button>
                </Flex>
            </DataGrid>
        </Box>
    );
};

export default StudentList;
