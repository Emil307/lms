import { Box, BoxProps, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { closeModal, openModal } from "@mantine/modals";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminCourseFromList, courseApi } from "@entities/course";
import { AdminCoursesFromCourseCollectionExtraFilters } from "@entities/courseCollection";
import { AddCoursesToCourseCollectionModal } from "@features/courseCollections";
import { columnOrder, columns } from "./constant";
import { AddCoursesToCollectionButton, ListMenu } from "./components";
import { adaptGetAdminCoursesRequest } from "./utils";
import useStyles from "./AdminCourseFromCollectionList.styles";

export interface AdminCourseFromCollectionListProps extends BoxProps {
    courseCollectionId: string;
}

const AdminCourseFromCollectionList = ({ courseCollectionId, ...props }: AdminCourseFromCollectionListProps) => {
    const router = useRouter();
    const { classes } = useStyles();

    const handleClickCell = (cell: MRT_Cell<AdminCourseFromList>) =>
        router.push({ pathname: "/admin/courses/[id]", query: { id: String(cell.row.original.id) } });

    const handleCloseAddCoursesToCourseCollectionModal = () => closeModal("ADD_COURSES_TO_COURSE_COLLECTION");

    const openAddCoursesToCourseCollectionModal = () => {
        openModal({
            modalId: "ADD_COURSES_TO_COURSE_COLLECTION",
            title: "Добавить курс",
            children: (
                <AddCoursesToCourseCollectionModal
                    courseCollectionId={courseCollectionId}
                    onClose={handleCloseAddCoursesToCourseCollectionModal}
                />
            ),
            size: 912,
            styles: () => ({ modal: { height: 860 } }),
        });
    };

    return (
        <Box {...props}>
            <Flex className={classes.headingContainer}>
                <Heading order={2}>Список курсов</Heading>
                <AddCoursesToCollectionButton onClick={openAddCoursesToCourseCollectionModal} />
            </Flex>
            <ManagedDataGrid<AdminCourseFromList, unknown, AdminCoursesFromCourseCollectionExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_COURSES_FROM_COURSE_COLLECTION}
                queryFunction={(params) => courseApi.getAdminCourses(adaptGetAdminCoursesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "collectionIds"]}
                onClickCell={handleClickCell}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
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
