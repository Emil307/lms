import { Box } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { EntityNames, QueryKeys } from "@shared/constant";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { AdminGroupFromList, groupApi } from "@entities/group";
import { TeacherGroupListExtraParams } from "./types";
import { adaptGetTeacherGroupsRequest } from "./utils";
import { columns, columnOrder } from "./constants";

export interface TeacherGroupListProps {
    id: string;
}

const TeacherGroupList = ({ id }: TeacherGroupListProps) => {
    const router = useRouter();

    const handlerClickCell = (cell: MRT_Cell<AdminGroupFromList>) => {
        router.push({ pathname: "/admin/groups/[id]", query: { id: String(cell.row.original.id) } });
    };

    return (
        <Box>
            <Heading order={2} mb={32}>
                Список групп
            </Heading>
            <ManagedDataGrid<AdminGroupFromList, unknown, TeacherGroupListExtraParams>
                queryKey={[QueryKeys.GET_TEACHER_GROUPS, EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER, EntityNames.STUDENT]}
                queryFunction={(params) => groupApi.getAdminGroups(adaptGetTeacherGroupsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "teacherId"]}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Групп"
                extraFilterParams={{ teacherId: id }}
                onClickCell={handlerClickCell}
                initialState={{
                    columnOrder,
                }}
            />
        </Box>
    );
};

export default TeacherGroupList;
