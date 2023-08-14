import { Box, Flex } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { BoxProps } from "@mantine/core";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { Button } from "@shared/ui";
import { AdminGroupScheduleFromList, AdminGroupStudentsExtraFilters, groupApi } from "@entities/group";
import { CreateScheduleForm } from "@features/groups";
import { QueryKeys } from "@shared/constant";
import { columnOrder, columns } from "./constant";
import { ListMenu } from "./components";

export interface GroupScheduleListProps extends BoxProps {
    groupId: string;
}

const GroupScheduleList = ({ groupId, ...props }: GroupScheduleListProps) => {
    const handleCloseCreateScheduleModal = () => closeModal("CREATE_SCHEDULE");

    const openCreateScheduleModal = () => {
        openModal({
            modalId: "CREATE_SCHEDULE",
            title: "Добавление занятия",
            children: <CreateScheduleForm groupId={groupId} onClose={handleCloseCreateScheduleModal} />,
        });
    };

    return (
        <Box {...props}>
            <Flex gap={48} align="center">
                <Heading order={2}>Расписание группы</Heading>
                <Button variant="text" onClick={openCreateScheduleModal} leftIcon={<PlusCircle />}>
                    Добавить занятие
                </Button>
            </Flex>

            <ManagedDataGrid<AdminGroupScheduleFromList, unknown, AdminGroupStudentsExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_GROUP_SCHEDULES}
                queryFunction={(params) => groupApi.getAdminGroupSchedules(params)}
                queryCacheKeys={["page", "perPage", "sort", "groupId"]}
                columns={columns}
                countName="Занятий"
                initialState={{
                    columnOrder,
                }}
                extraFilterParams={{ groupId }}
                renderRowActions={({ row }) => <ListMenu row={row} />}
            />
        </Box>
    );
};

export default GroupScheduleList;
