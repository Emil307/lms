import { Box, BoxProps, Flex } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { Button, Heading, ManagedDataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminArticleMaterialsExtraFilters, UploadedFileFromList, storageApi } from "@entities/storage";
import { AddMaterialsToArticleModal } from "@features/articles";
import { columns, columnOrder } from "./constants";
import { ListMenu } from "./components";
import { adaptGetArticleMaterialFilesRequest } from "./utils";

export interface ArticleMaterialListProps extends BoxProps {
    articleId: string;
}

const ArticleMaterialList = ({ articleId, ...props }: ArticleMaterialListProps) => {
    const handleCloseAddMaterialsToArticleModal = () => closeModal("ADD_MATERIAL_TO_ARTICLE");

    const openAddMaterialsToArticleModal = () => {
        openModal({
            modalId: "ADD_MATERIAL_TO_ARTICLE",
            title: "Добавить материалы",
            centered: true,
            children: <AddMaterialsToArticleModal articleId={articleId} onClose={handleCloseAddMaterialsToArticleModal} />,
            size: 912,
            mah: 912,
        });
    };

    return (
        <Box {...props}>
            <Flex gap={48} align="center">
                <Heading order={2}>Материалы</Heading>
                <Button variant="text" onClick={openAddMaterialsToArticleModal} leftIcon={<PlusCircle />}>
                    Добавить материалы
                </Button>
            </Flex>
            <ManagedDataGrid<UploadedFileFromList, unknown, AdminArticleMaterialsExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_ARTICLE_MATERIALS}
                queryFunction={(params) => storageApi.getUploadedFiles(adaptGetArticleMaterialFilesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "articleId"]}
                extraFilterParams={{ articleId }}
                renderActiveBadge={(cell) => cell.row.original.isActive}
                columns={columns}
                countName="Материалов"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} articleId={articleId} />}
            />
        </Box>
    );
};

export default ArticleMaterialList;
