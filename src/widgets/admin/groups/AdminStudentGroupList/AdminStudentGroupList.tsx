import { Box } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { QueryKeys } from "@shared/constant";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { AdminStudentGroupFromList, groupApi } from "@entities/group";
import { StudentGroupListExtraParams } from "./types";
import { columns, columnOrder } from "./constants";
import { ListMenu } from "./components";

export interface AdminStudentGroupListProps {
    studentId: string;
}

const AdminStudentGroupList = ({ studentId }: AdminStudentGroupListProps) => {
    const router = useRouter();

    const handleClickCell = (cell: MRT_Cell<AdminStudentGroupFromList>) => {
        router.push({ pathname: "/admin/groups/[id]", query: { id: String(cell.row.original.id) } });
    };

    return (
        <Box>
            <Heading order={2} mb={32}>
                Список групп
            </Heading>
            <ManagedDataGrid<AdminStudentGroupFromList, unknown, StudentGroupListExtraParams>
                queryKey={QueryKeys.GET_ADMIN_STUDENT_GROUPS}
                queryFunction={(params) => groupApi.getAdminStudentGroups(params)}
                queryCacheKeys={["page", "perPage", "sort", "studentId"]}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Групп"
                extraFilterParams={{ studentId }}
                onClickCell={handleClickCell}
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}
            />
        </Box>
    );
};

export default AdminStudentGroupList;
