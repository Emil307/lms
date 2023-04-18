import { Box, Flex, ThemeIcon, Title } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { closeModal, openModal } from "@mantine/modals";
import { DataGrid } from "@shared/ui";
import { Button } from "@shared/ui";
import { groupApi, ScheduleLine } from "@entities/group";
import { CreateScheduleForm } from "@features/groups";
import { columns } from "./constant";
import { ListMenu } from "./components";
import { QueryKeys } from "@shared/constant";

const GroupSchedule = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };

    const pushOnUserDetail = (id: number) => router.push({ pathname: "/admin/users/[id]", query: { id: String(id) } });

    const handlerClickCell = (cell: MRT_Cell<ScheduleLine>) => {
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
                queryKey={QueryKeys.GET_GROUP_SCHEDULES}
                queryFunction={(params) => groupApi.getGroupSchedules({ groupId: id, ...params })}
                queryCacheKeys={["page", "perPage", "sort"]}
                onClickCell={handlerClickCell}
                columns={columns}
                countName="Занятия"
                initialState={{
                    columnOrder: ["date", "timings", "mrt-row-actions"],
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}>
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
