import { Box, BoxProps, Flex, Title } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { Button, DataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminArticleMaterial, AdminArticleMaterialsFilters, articleApi } from "@entities/article";
import { columns, columnOrder } from "./constants";
import { ListMenu } from "./components";

export interface ArticleMaterialListProps extends BoxProps {
    articleId: string;
}

const ArticleMaterialList = ({ articleId, ...props }: ArticleMaterialListProps) => {
    //TODO: Когда будут полностью готовы ресурсы и прочее для материалов
    const openModalCreateMaterial = () => undefined;

    return (
        <Box {...props}>
            <Flex gap={48} align="center">
                <Title order={2} color="dark">
                    Материалы
                </Title>
                <Button variant="text" onClick={openModalCreateMaterial} leftIcon={<PlusCircle />}>
                    Добавить материалы
                </Button>
            </Flex>
            <DataGrid<AdminArticleMaterial, AdminArticleMaterialsFilters>
                queryKey={QueryKeys.GET_ADMIN_ARTICLE_MATERIALS}
                queryFunction={(params) => articleApi.getAdminArticleMaterials({ ...params, articleId })}
                queryCacheKeys={["page", "perPage", "sort", "articleId"]}
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
