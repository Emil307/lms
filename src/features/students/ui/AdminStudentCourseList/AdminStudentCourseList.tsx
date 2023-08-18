import { Box, BoxProps, Flex } from "@mantine/core";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminCourseFromList, AdminStudentCoursesExtraFilters, courseApi } from "@entities/course";
import { columns, columnOrder } from "./constants";
import { AddStudentCourseButton, ListMenu } from "./components";
import { adaptGetStudentCoursesRequest } from "./utils";
import useStyles from "./AdminStudentCourseList.styles";

export interface AdminStudentCourseListProps extends BoxProps {
    studentId: string;
}

const AdminStudentCourseList = ({ studentId, ...props }: AdminStudentCourseListProps) => {
    const { classes } = useStyles();

    return (
        <Box {...props}>
            <Flex className={classes.headingContainer}>
                <Heading order={2}>Список курсов</Heading>
                <AddStudentCourseButton studentId={studentId} />
            </Flex>
            <ManagedDataGrid<AdminCourseFromList, unknown, AdminStudentCoursesExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_STUDENT_COURSES}
                queryFunction={(params) => courseApi.getAdminCourses(adaptGetStudentCoursesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "studentId"]}
                extraFilterParams={{ studentId }}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Курсов"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} studentId={studentId} />}
            />
        </Box>
    );
};

export default AdminStudentCourseList;
