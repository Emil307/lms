import { Box, Flex } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { MRT_Cell } from "mantine-react-table";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminCourseFromList, courseApi } from "@entities/course";
import { AdminCourseFromCoursePackageFilters } from "@entities/coursePackage";
import { columnOrder, columns } from "./constant";
import { ListMenu } from "./components";
import { adaptGetAdminCoursesRequest } from "./utils";
import { AddCourseToCoursePackageModal } from "../AddCourseToCoursePackageModal";

export interface CourseListProps {
    coursePackageId: string;
}

const CourseList = ({ coursePackageId }: CourseListProps) => {
    const router = useRouter();
    const handleClickCell = (cell: MRT_Cell<AdminCourseFromList>) =>
        router.push({ pathname: "/admin/courses/[id]", query: { id: String(cell.row.original.id) } });

    const handleCloseAddCourseToPackageModal = () => closeModal("ADD_COURSE_TO_PACKAGE");

    const openAddCourseToPackageModal = () => {
        openModal({
            modalId: "ADD_COURSE_TO_PACKAGE",
            title: "Добавить курс",
            children: <AddCourseToCoursePackageModal coursePackageId={coursePackageId} onClose={handleCloseAddCourseToPackageModal} />,
            size: 912,
            mah: 912,
        });
    };

    return (
        <Box mt={24}>
            <Flex gap={48} align="center">
                <Heading order={2}>Список курсов</Heading>
                <Button variant="text" onClick={openAddCourseToPackageModal} leftIcon={<PlusCircle />}>
                    Добавить курс
                </Button>
            </Flex>
            <ManagedDataGrid<AdminCourseFromList, unknown, AdminCourseFromCoursePackageFilters>
                queryKey={QueryKeys.GET_ADMIN_COURSES_FROM_COURSE_PACKAGE}
                queryFunction={(params) => courseApi.getAdminCourses(adaptGetAdminCoursesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "coursePackageId"]}
                onClickCell={handleClickCell}
                renderActiveBadge={(cell) => cell.row.original.isActive}
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
