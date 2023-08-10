import { Box, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminCourseFromList, courseApi } from "@entities/course";
import { AdminCourseFromCoursePackageFilters } from "@entities/coursePackage";
import { columnOrder, columns } from "./constant";
import { AddCoursesToCoursePackageButton, ListMenu } from "./components";
import { adaptGetAdminCoursesRequest } from "./utils";
import useStyles from "./CourseList.styles";

export interface CourseListProps {
    coursePackageId: string;
}

const CourseList = ({ coursePackageId }: CourseListProps) => {
    const router = useRouter();
    const { classes } = useStyles();

    const handleClickCell = (cell: MRT_Cell<AdminCourseFromList>) =>
        router.push({ pathname: "/admin/courses/[id]", query: { id: String(cell.row.original.id) } });

    return (
        <Box mt={24}>
            <Flex className={classes.headingContainer}>
                <Heading order={2}>Список курсов</Heading>
                <AddCoursesToCoursePackageButton coursePackageId={coursePackageId} />
            </Flex>
            <ManagedDataGrid<AdminCourseFromList, unknown, AdminCourseFromCoursePackageFilters>
                queryKey={QueryKeys.GET_ADMIN_COURSES_FROM_COURSE_PACKAGE}
                queryFunction={(params) => courseApi.getAdminCourses(adaptGetAdminCoursesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "coursePackageId"]}
                onClickCell={handleClickCell}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="курсов"
                initialState={{
                    columnOrder,
                }}
                extraFilterParams={{ coursePackageId }}
                renderRowActions={({ row }) => <ListMenu row={row} coursePackageId={coursePackageId} />}
            />
        </Box>
    );
};

export default CourseList;
