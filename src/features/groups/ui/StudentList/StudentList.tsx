import { Box, BoxProps, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { AdminGroupStudentFromList, AdminGroupStudentsExtraFilters, groupApi } from "@entities/group";
import { EntityNames, QueryKeys } from "@shared/constant";
import { useUserRole } from "@entities/auth/hooks";
import { Roles } from "@shared/types";
import { columnOrder, columns } from "./constant";
import { AddStudentsToGroupButton, ListMenu } from "./components";
import useStyles from "./StudentList.styles";

export interface StudentListProps extends BoxProps {
    groupId: string;
    courseId: number;
}

const StudentList = ({ groupId, courseId, ...props }: StudentListProps) => {
    const router = useRouter();
    const { classes } = useStyles();

    const userRole = useUserRole();

    const handleClickCell = (cell: MRT_Cell<AdminGroupStudentFromList>) => {
        router.push({ pathname: "/admin/students/[id]", query: { id: String(cell.row.original.id) } });
    };

    return (
        <Box {...props}>
            <Flex className={classes.headingContainer}>
                <Heading order={2}>Состав группы</Heading>
                <AddStudentsToGroupButton groupId={groupId} courseId={courseId} hidden={userRole?.name === Roles.teacher} />
            </Flex>
            <ManagedDataGrid<AdminGroupStudentFromList, unknown, AdminGroupStudentsExtraFilters>
                queryKey={[
                    QueryKeys.GET_ADMIN_GROUP_STUDENTS,
                    [EntityNames.GROUP, EntityNames.STUDENT, EntityNames.LESSON, EntityNames.LESSON_HOMEWORK, EntityNames.LESSON_TEST],
                ]}
                queryFunction={(params) => groupApi.getAdminGroupStudents(params)}
                queryCacheKeys={["page", "perPage", "sort", "groupId"]}
                onClickCell={handleClickCell}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Учеников"
                initialState={{
                    columnOrder,
                }}
                extraFilterParams={{
                    groupId,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} groupId={groupId} />}
            />
        </Box>
    );
};

export default StudentList;
