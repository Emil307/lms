import { Box, BoxProps, Flex } from "@mantine/core";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminArticleMaterialsExtraFilters, UploadedFileFromList, storageApi } from "@entities/storage";
import { columns, columnOrder } from "./constants";
import { AddMaterialsToArticleButton, ListMenu } from "./components";
import { adaptGetArticleMaterialFilesRequest } from "./utils";
import useStyles from "./AdminArticleMaterialList.styles";

export interface AdminArticleMaterialListProps extends BoxProps {
    articleId: string;
}

const AdminArticleMaterialList = ({ articleId, ...props }: AdminArticleMaterialListProps) => {
    const { classes } = useStyles();

    return (
        <Box {...props}>
            <Flex className={classes.headingContainer}>
                <Heading order={2}>Материалы</Heading>
                <AddMaterialsToArticleButton articleId={articleId} />
            </Flex>
            <ManagedDataGrid<UploadedFileFromList, unknown, AdminArticleMaterialsExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_ARTICLE_MATERIALS}
                queryFunction={(params) => storageApi.getUploadedFiles(adaptGetArticleMaterialFilesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "articleId"]}
                extraFilterParams={{ articleId }}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
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

export default AdminArticleMaterialList;