import { Box, Flex, Title } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { closeModal, openModal } from "@mantine/modals";
import { ManagedDataGrid } from "@shared/ui";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminCourseFromList, courseApi } from "@entities/course";
import { AdminCoursesFromCourseCollectionExtraFilters } from "@entities/courseCollection";
import { AddCoursesToCourseCollectionModal } from "@features/courseCollections";
import { columnOrder, columns } from "./constant";
import { ListMenu } from "./components";
import { adaptGetAdminCoursesRequest } from "./utils";

export interface AdminCourseFromCollectionListProps {
    courseCollectionId: string;
}

const AdminCourseFromCollectionList = ({ courseCollectionId }: AdminCourseFromCollectionListProps) => {
    const router = useRouter();

    const handleClickCell = (cell: MRT_Cell<AdminCourseFromList>) =>
        router.push({ pathname: "/admin/courses/[id]", query: { id: String(cell.row.original.id) } });

    const handleCloseAddCoursesToCourseCollectionModal = () => closeModal("ADD_COURSES_TO_COURSE_COLLECTION");

    const openAddCoursesToCourseCollectionModal = () => {
        openModal({
            modalId: "ADD_COURSES_TO_COURSE_COLLECTION",
            title: "Добавить курс",
            centered: true,
            children: (
                <AddCoursesToCourseCollectionModal
                    courseCollectionId={courseCollectionId}
                    onClose={handleCloseAddCoursesToCourseCollectionModal}
                />
            ),
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
                <Button variant="text" leftIcon={<PlusCircle />} onClick={openAddCoursesToCourseCollectionModal}>
                    Добавить курс
                </Button>
            </Flex>
            <ManagedDataGrid<AdminCourseFromList, unknown, AdminCoursesFromCourseCollectionExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_COURSES_FROM_COURSE_COLLECTION}
                queryFunction={(params) => courseApi.getAdminCourses(adaptGetAdminCoursesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "collectionIds"]}
                onClickCell={handleClickCell}
                renderActiveBadge={(cell) => cell.row.original.isActive}
                columns={columns}
                countName="Курсов"
                initialState={{
                    columnOrder,
                }}
                extraFilterParams={{ collectionIds: courseCollectionId }}
                renderRowActions={({ row }) => <ListMenu row={row} courseCollectionId={courseCollectionId} />}
            />
        </Box>
    );
};

export default AdminCourseFromCollectionList;
