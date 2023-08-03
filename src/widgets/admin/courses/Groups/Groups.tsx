import { Box, Flex, Title } from "@mantine/core";
import { PlusCircle as PlusCircleIcon } from "react-feather";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { ManagedDataGrid } from "@shared/ui";
import { Button } from "@shared/ui";
import { AdminGroupFromList, groupApi } from "@entities/group";
import { QueryKeys } from "@shared/constant";
import { columns, columnOrder } from "./constants";
import { ListMenu } from "./components";
import { adaptGetAdminGroupsRequest } from "./utils";
import { TCourseGroupsExtraParams } from "./types";

interface GroupsProps {
    courseId: string;
}

const Groups = ({ courseId }: GroupsProps) => {
    const router = useRouter();

    const handleClickCell = (cell: MRT_Cell<AdminGroupFromList>) => {
        router.push({ pathname: "/admin/groups/[id]", query: { id: String(cell.row.original.id) } });
    };

    const handleOpenCreateForm = () => {
        router.push({ pathname: "/admin/groups/create", query: { courseId } });
    };

    return (
        <Box>
            <Flex align="center" gap={48}>
                <Title order={2} color="dark">
                    Группы
                </Title>
                <Button onClick={handleOpenCreateForm} variant="text" leftIcon={<PlusCircleIcon />}>
                    Добавить группу
                </Button>
            </Flex>

            <ManagedDataGrid<AdminGroupFromList, unknown, TCourseGroupsExtraParams>
                queryKey={QueryKeys.GET_ADMIN_GROUPS}
                queryFunction={(params) => groupApi.getAdminGroups(adaptGetAdminGroupsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "courseId"]}
                extraFilterParams={{ courseId }}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                onClickCell={handleClickCell}
                columns={columns}
                countName="Групп"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}></ManagedDataGrid>
        </Box>
    );
};

export default Groups;
