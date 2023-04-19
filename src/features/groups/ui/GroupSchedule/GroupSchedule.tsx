import { Box, Flex, ThemeIcon, Title } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { closeModal, openModal } from "@mantine/modals";
import { DataGrid } from "@shared/ui";
import { Button } from "@shared/ui";
import { groupApi, GroupSchedulesFilters, ScheduleLine } from "@entities/group";
import { CreateScheduleForm } from "@features/groups";
import { QueryKeys } from "@shared/constant";
import { TRouterQueries } from "@shared/types";
import { columnOrder, columns } from "./constant";
import { ListMenu } from "./components";

const GroupSchedule = () => {
    const router = useRouter();
    const { id: groupId } = router.query as TRouterQueries;

    const handleCloseCreateScheduleModal = () => closeModal("CREATE_SCHEDULE");

    const openModalCreateSchedule = () => {
        openModal({
            modalId: "CREATE_SCHEDULE",
            title: "Добавление занятия",
            centered: true,
            children: <CreateScheduleForm groupId={groupId} onClose={handleCloseCreateScheduleModal} />,
        });
    };

    return (
        <Box mt={24}>
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

            <DataGrid<ScheduleLine, GroupSchedulesFilters>
                queryKey={QueryKeys.GET_GROUP_SCHEDULES}
                queryFunction={(params) => groupApi.getGroupSchedules({ ...params, groupId })}
                queryCacheKeys={["page", "perPage", "sort", "groupId"]}
                columns={columns}
                countName="Занятий"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}
            />
        </Box>
    );
};

export default GroupSchedule;
