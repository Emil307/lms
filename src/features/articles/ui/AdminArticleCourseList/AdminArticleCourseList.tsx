import { Box, BoxProps, Flex, Title } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { Button, ManagedDataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AddCoursesToArticleModal } from "@features/articles";
import { AdminArticleCoursesExtraFilters, AdminCourseFromList, courseApi } from "@entities/course";
import { columns, columnOrder } from "./constants";
import { ListMenu } from "./components";
import { adaptGetArticleCoursesRequest } from "./utils";

export interface AdminArticleCourseListProps extends BoxProps {
    articleId: string;
}

const AdminArticleCourseList = ({ articleId, ...props }: AdminArticleCourseListProps) => {
    const handleCloseAddCoursesToArticleModal = () => closeModal("ATTACH_COURSES_TO_ARTICLE");

    const openAddCoursesToArticleModal = () => {
        openModal({
            modalId: "ATTACH_COURSES_TO_ARTICLE",
            title: "Привязать к курсу",
            centered: true,
            children: <AddCoursesToArticleModal articleId={articleId} onClose={handleCloseAddCoursesToArticleModal} />,
            size: 912,
            mah: 912,
        });
    };

    return (
        <Box {...props}>
            <Flex gap={48} align="center">
                <Title order={2} color="dark">
                    Привязка к курсу
                </Title>
                <Button variant="text" onClick={openAddCoursesToArticleModal} leftIcon={<PlusCircle />}>
                    Добавить привязку
                </Button>
            </Flex>
            <ManagedDataGrid<AdminCourseFromList, unknown, AdminArticleCoursesExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_ARTICLE_COURSES}
                queryFunction={(params) => courseApi.getAdminCourses(adaptGetArticleCoursesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "articleId"]}
                extraFilterParams={{ articleId }}
                renderActiveBadge={(cell) => cell.row.original.isActive}
                columns={columns}
                countName="Курсов"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} articleId={articleId} />}
            />
        </Box>
    );
};

export default AdminArticleCourseList;
