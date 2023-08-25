import { Box, BoxProps, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminArticleFromList, articleApi } from "@entities/article";
import { AdminArticlesFromArticlePackageExtraFilters } from "@entities/articlePackage";
import { columnOrder, columns } from "./constant";
import { AddArticlesToArticlePackageButton, ListMenu } from "./components";
import { adaptGetAdminArticlesRequest } from "./utils";
import useStyles from "./AdminArticleList.styles";

export interface AdminArticleListProps extends Omit<BoxProps, "children"> {
    articlePackageId: string;
}

const AdminArticleList = ({ articlePackageId, ...props }: AdminArticleListProps) => {
    const router = useRouter();
    const { classes } = useStyles();

    const handleClickCell = (cell: MRT_Cell<AdminArticleFromList>) =>
        router.push({ pathname: "/admin/articles/[id]", query: { id: String(cell.row.original.id) } });

    return (
        <Box {...props}>
            <Flex className={classes.headingContainer}>
                <Heading order={2}>Список статей пакета</Heading>
                <AddArticlesToArticlePackageButton articlePackageId={articlePackageId} />
            </Flex>
            <ManagedDataGrid<AdminArticleFromList, unknown, AdminArticlesFromArticlePackageExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_ARTICLES_FROM_ARTICLE_PACKAGE}
                queryFunction={(params) => articleApi.getAdminArticles(adaptGetAdminArticlesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "articlePackageIds"]}
                onClickCell={handleClickCell}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Статей"
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
