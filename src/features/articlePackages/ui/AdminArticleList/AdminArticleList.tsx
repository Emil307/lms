import { Box, Flex, Title } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { closeModal, openModal } from "@mantine/modals";
import { ManagedDataGrid } from "@shared/ui";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminArticleFromList, articleApi } from "@entities/article";
import { AdminArticlesFromArticlePackageExtraFilters } from "@entities/articlePackage";
import { AddArticleToArticlePackageModal } from "@features/articlePackages";
import { columnOrder, columns } from "./constant";
import { ListMenu } from "./components";
import { adaptGetAdminArticlesRequest } from "./utils";

export interface AdminArticleListProps {
    articlePackageId: string;
}

const AdminArticleList = ({ articlePackageId }: AdminArticleListProps) => {
    const router = useRouter();

    const handleClickCell = (cell: MRT_Cell<AdminArticleFromList>) =>
        router.push({ pathname: "/admin/articles/[id]", query: { id: String(cell.row.original.id) } });

    const handleCloseAddArticleToPackageModal = () => closeModal("ADD_ARTICLE_TO_ARTICLE_PACKAGE");

    const openAddArticleToPackageModal = () => {
        openModal({
            modalId: "ADD_ARTICLE_TO_ARTICLE_PACKAGE",
            title: "Добавить статью",
            centered: true,
            children: <AddArticleToArticlePackageModal articlePackageId={articlePackageId} onClose={handleCloseAddArticleToPackageModal} />,
            size: 912,
            mah: 912,
        });
    };

    return (
        <Box mt={24}>
            <Flex gap={48} align="center">
                <Title order={2} color="dark">
                    Список статей пакета
                </Title>
                <Button variant="text" leftIcon={<PlusCircle />} onClick={openAddArticleToPackageModal}>
                    Добавить статью
                </Button>
            </Flex>
            <ManagedDataGrid<AdminArticleFromList, unknown, AdminArticlesFromArticlePackageExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_ARTICLES_FROM_ARTICLE_PACKAGE}
                queryFunction={(params) => articleApi.getAdminArticles(adaptGetAdminArticlesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "articlePackageIds"]}
                onClickCell={handleClickCell}
                renderActiveBadge={(cell) => cell.row.original.isActive}
                columns={columns}
                countName="статей"
                initialState={{
                    columnOrder,
                }}
                extraFilterParams={{ articlePackageIds: articlePackageId }}
                renderRowActions={({ row }) => <ListMenu row={row} articlePackageId={articlePackageId} />}
            />
        </Box>
    );
};

export default AdminArticleList;
