import { AdminCourseFromList, courseApi } from "@entities/course";
import { QueryKeys } from "@shared/constant";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { Box } from "@mantine/core";
import { TeacherCourseListExtraParams } from "./types";
import { adaptGetTeacherCoursesRequest } from "./utils";
import { columns, columnOrder } from "./constants";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";

interface TeacherCourseListProps {
    id: string;
}

const TeacherCourseList = ({ id }: TeacherCourseListProps) => {
    const router = useRouter();

    const handlerClickCell = (cell: MRT_Cell<AdminCourseFromList>) => {
        router.push({ pathname: "/admin/courses/[id]", query: { id: String(cell.row.original.id) } });
    };

    return (
        <Box>
            <Heading order={2}>Список курсов</Heading>
            <ManagedDataGrid<AdminCourseFromList, unknown, TeacherCourseListExtraParams>
                queryKey={QueryKeys.GET_TEACHER_COURSES}
                queryFunction={(params) => courseApi.getAdminCourses(adaptGetTeacherCoursesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "teacherId"]}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Курсов"
                extraFilterParams={{ teacherId: id }}
                onClickCell={handlerClickCell}
                initialState={{
                    columnOrder,
                }}></ManagedDataGrid>
        </Box>
    );
};

export default TeacherCourseList;
