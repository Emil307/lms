import { Box, Flex, ThemeIcon, Title } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { MRT_Cell } from "mantine-react-table";
import { DataGrid } from "@shared/ui";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminArticleFromArticlePackage, AdminArticlesFromArticlePackageFilters, articlePackageApi } from "@entities/articlePackage";
import { columnOrder, columns } from "./constant";
import { ListMenu } from "./components";

export interface ArticleListProps {
    articlePackageId: string;
}

const ArticleList = ({ articlePackageId }: ArticleListProps) => {
    //TODO: Добаить роут как будут добавлен раздел Базы знаний
    const handlerClickCell = (_cell: MRT_Cell<AdminArticleFromArticlePackage>) => undefined;

    return (
        <Box mt={24}>
            <Flex gap={48} align="center">
                <Title order={2} color="dark">
                    Список статей пакета
                </Title>
                <Button
                    variant="text"
                    leftIcon={
                        <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                            <PlusCircle />
                        </ThemeIcon>
                    }>
                    Добавить статью
                </Button>
            </Flex>
            <DataGrid<AdminArticleFromArticlePackage, AdminArticlesFromArticlePackageFilters>
                queryKey={QueryKeys.GET_ADMIN_ARTICLES_FROM_ARTICLE_PACKAGE}
                queryFunction={(params) => articlePackageApi.getAdminArticlesFromArticlePackage({ ...params, articlePackageId })}
                queryCacheKeys={["page", "perPage", "sort", "articlePackageId"]}
                onClickCell={handlerClickCell}
                renderActiveBadge={(cell) => cell.row.original.isActive}
                columns={columns}
                countName="статей"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} articlePackageId={articlePackageId} />}
            />
        </Box>
    );
};

export default ArticleList;
