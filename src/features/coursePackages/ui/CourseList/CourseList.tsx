import { Box, Flex, ThemeIcon, Title } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { MRT_Cell } from "mantine-react-table";
import { closeModal, openModal } from "@mantine/modals";
import { ManagedDataGrid } from "@shared/ui";
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
    //TODO: Добавить редирект после того как будет готова детальная страница курса в админке
    const handlerClickCell = (_cell: MRT_Cell<AdminCourseFromList>) => undefined;

    const handleCloseAddCourseToPackageModal = () => closeModal("ADD_COURSE_TO_PACKAGE");

    const openAddCourseToPackageModal = () => {
        openModal({
            modalId: "ADD_COURSE_TO_PACKAGE",
            title: "Добавить курс",
            centered: true,
            children: <AddCourseToCoursePackageModal coursePackageId={coursePackageId} onClose={handleCloseAddCourseToPackageModal} />,
            size: 912,
            mah: 912,
        });
    };

    return (
        <Box mt={24}>
            <Flex gap={48} align="center">
                <Title order={2} color="dark">
                    Список курсов
                </Title>
                <Button
                    variant="text"
                    onClick={openAddCourseToPackageModal}
                    leftIcon={
                        <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                            <PlusCircle />
                        </ThemeIcon>
                    }>
                    Добавить курс
                </Button>
            </Flex>
            <ManagedDataGrid<AdminCourseFromList, unknown, AdminCourseFromCoursePackageFilters>
                queryKey={QueryKeys.GET_ADMIN_COURSES_FROM_COURSE_PACKAGE}
                queryFunction={(params) => courseApi.getAdminCourses(adaptGetAdminCoursesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "coursePackageId"]}
                onClickCell={handlerClickCell}
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