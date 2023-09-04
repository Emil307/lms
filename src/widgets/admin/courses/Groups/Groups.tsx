import { Box, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { AdminGroupFromList, groupApi } from "@entities/group";
import { QueryKeys } from "@shared/constant";
import { useUserRole } from "@entities/auth";
import { Roles } from "@app/routes";
import { AddGroupButton, ListMenu } from "./components";
import { useCourseGroupsListData } from "./utils";
import { TCourseGroupsExtraParams } from "./types";
import useStyles from "./Groups.styles";

interface GroupsProps {
    courseId: string;
}

const Groups = ({ courseId }: GroupsProps) => {
    const router = useRouter();
    const { classes } = useStyles({ statusType: undefined });

    const userRole = useUserRole();

    const { columns, columnOrder, adaptGetAdminGroupsRequest, renderBadge } = useCourseGroupsListData(userRole);

    const handleClickCell = (cell: MRT_Cell<AdminGroupFromList>) => {
        router.push({ pathname: "/admin/groups/[id]", query: { id: String(cell.row.original.id) } });
    };

    return (
        <Box>
            <Flex className={classes.heading}>
                <Heading order={2} color="dark">
                    Группы
                </Heading>
                <AddGroupButton courseId={courseId} hidden={userRole === Roles.teacher} />
            </Flex>

            <ManagedDataGrid<AdminGroupFromList, unknown, TCourseGroupsExtraParams>
                queryKey={QueryKeys.GET_ADMIN_GROUPS}
                queryFunction={(params) => groupApi.getAdminGroups(adaptGetAdminGroupsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "courseId"]}
                extraFilterParams={{ courseId }}
                renderBadge={renderBadge()}
                onClickCell={handleClickCell}
                columns={columns}
                accessRole={userRole}
                countName="Групп"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}
            />
        </Box>
    );
};

export default Groups;
