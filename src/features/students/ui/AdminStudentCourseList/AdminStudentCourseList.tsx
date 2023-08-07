import { Box, BoxProps, Flex } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { Button, Heading, ManagedDataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminCourseFromList, AdminStudentCoursesExtraFilters, courseApi } from "@entities/course";
import { AddCoursesToStudentModal } from "@features/students";
import { columns, columnOrder } from "./constants";
import { ListMenu } from "./components";
import { adaptGetStudentCoursesRequest } from "./utils";

export interface AdminStudentCourseListProps extends BoxProps {
    studentId: string;
}

const AdminStudentCourseList = ({ studentId, ...props }: AdminStudentCourseListProps) => {
    const handleCloseAddCoursesToStudentModal = () => closeModal("ATTACH_COURSES_TO_STUDENT");

    const openAddCoursesToStudentModal = () => {
        openModal({
            modalId: "ATTACH_COURSES_TO_STUDENT",
            title: "Добавить курс",
            centered: true,
            children: <AddCoursesToStudentModal studentId={studentId} onClose={handleCloseAddCoursesToStudentModal} />,
            size: 912,
            mah: 912,
        });
    };

    return (
        <Box {...props}>
            <Flex gap={48} align="center">
                <Heading order={2}>Список курсов</Heading>
                <Button variant="text" onClick={openAddCoursesToStudentModal} leftIcon={<PlusCircle />}>
                    Добавить курс
                </Button>
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
