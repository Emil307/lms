import { Box, BoxProps, Flex } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { MRT_Cell } from "mantine-react-table";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { Button } from "@shared/ui";
import { AdminGroupParticipantFromList, AdminGroupParticipantsExtraFilters, groupApi } from "@entities/group";
import { QueryKeys } from "@shared/constant";
import { columnOrder, columns } from "./constant";
import { ListMenu } from "./components";

export interface StudentListProps extends BoxProps {
    groupId: string;
}

const StudentList = ({ groupId, ...props }: StudentListProps) => {
    const handleClickCell = (_cell: MRT_Cell<AdminGroupParticipantFromList>) => {
        //TODO: редирект на страницу статистику ученика // или просто пользака
    };

    return (
        <Box {...props}>
            <Flex gap={48} align="center">
                <Heading order={2}>Состав группы</Heading>
                <Button variant="text" leftIcon={<PlusCircle />}>
                    Добавить ученика
                </Button>
            </Flex>
            <ManagedDataGrid<AdminGroupParticipantFromList, unknown, AdminGroupParticipantsExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_GROUP_PARTICIPANTS}
                queryFunction={(params) => groupApi.getAdminGroupParticipants(params)}
                queryCacheKeys={["page", "perPage", "sort", "groupId"]}
                onClickCell={handleClickCell}
                //TODO: https://gitlab.addamant-work.ru/business-gallery/business-gallery-back/-/issues/159
                // renderActiveBadge={(cell) => cell.row.original.isActive}
                columns={columns}
                countName="Учеников"
                initialState={{
                    columnOrder,
                }}
                extraFilterParams={{
                    groupId,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}
            />
        </Box>
    );
};

export default StudentList;
