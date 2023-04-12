import { Box, Flex, ThemeIcon, Title } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { useState } from "react";
import { MRT_Cell, MRT_SortingState } from "mantine-react-table";
import { useRouter } from "next/router";
import { closeModal, openModal } from "@mantine/modals";
import { DataGrid } from "@shared/ui";
import { Button } from "@shared/ui";
import Pagination from "@shared/ui/DataGrid/Pagination";
import { ScheduleLine, useGroupSchedules } from "@entities/group";
import { CreateScheduleForm } from "@features/groups";
import { columns, getStylesForCell } from "./constant";
import { ListMenu } from "./components";

const GroupSchedule = () => {
    const router = useRouter();
    const { page, perPage, id } = router.query as {
        page?: string;
        perPage?: string;
        id?: string;
    };
    const [sorting, setSorting] = useState<MRT_SortingState>([]);

    //TODO: Таблица пока не настроена так как что касается учеников на стороне бекенда ничего нет
    const { data, isLoading, isRefetching, isFetching } = useGroupSchedules({
        groupId: String(id),
        perPage: perPage ? Number(perPage) : 10,
        page: page ? Number(page) : 1,
    });

    const totalPage = data?.meta.pagination.total_pages;
    const firstElemIndex = (data?.meta.pagination.per_page ?? 0) * ((data?.meta.pagination.current_page ?? 0) - 1) + 1;
    const lastElemIndex =
        (data?.meta.pagination.per_page ?? 0) * ((data?.meta.pagination.current_page ?? 0) - 1) + (data?.meta.pagination.count ?? 0);

    const pushOnUserDetail = (id: number) => router.push({ pathname: "/admin/users/[id]", query: { id: String(id) } });

    const handlerClickCell = (cell: MRT_Cell<ScheduleLine>) => {
        if (cell.column.id === "mrt-row-actions") return;
        pushOnUserDetail(cell.row.original.id);
    };

    const handleCloseCreateScheduleModal = () => closeModal("CREATE_SCHEDULE");

    const openModalCreateSchedule = () => {
        openModal({
            modalId: "CREATE_SCHEDULE",
            title: "Добавление занятия",
            centered: true,
            children: <CreateScheduleForm groupId={id} onClose={handleCloseCreateScheduleModal} />,
        });
    };

    //TODO: Таблица пока не настроена так как что касается учеников на стороне бекенда ничего нет

    return (
        <Box mt={24}>
            <DataGrid<ScheduleLine>
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
                countName="Занятия"
                count={data?.meta.pagination.count}
                total={data?.meta.pagination.total}
                initialState={{
                    columnOrder: ["date", "timings", "mrt-row-actions"],
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
                <Flex gap={48} align="center">
                    <Title order={2} color="dark">
                        Расписание группы
                    </Title>
                    <Button
                        variant="text"
                        onClick={openModalCreateSchedule}
                        leftIcon={
                            <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                                <PlusCircle />
                            </ThemeIcon>
                        }>
                        Добавить занятие
                    </Button>
                </Flex>
            </DataGrid>
        </Box>
    );
};

export default GroupSchedule;
