import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import React from "react";
import { Box, BoxProps, Flex, Title } from "@mantine/core";
import { ManagedDataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminArticleFromList, AdminCourseArticleExtraFilters, articleApi } from "@entities/article";
import { columns, columnOrder } from "./constants";
import { AddCourseArticlesButton, ListMenu } from "./components";
import { adaptGetAdminCourseArticlesRequest } from "./utils";

export interface ArticlesProps extends Omit<BoxProps, "children"> {
    courseId: string;
}

const Articles = ({ courseId, ...props }: ArticlesProps) => {
    const router = useRouter();

    const handleClickCell = (cell: MRT_Cell<AdminArticleFromList>) => {
        router.push({ pathname: "/admin/articles/[id]", query: { id: cell.row.original.id.toString() } });
    };

    return (
        <Box {...props}>
            <Flex align="center" gap={48}>
                <Title order={2} color="dark">
                    Статьи
                </Title>
                <AddCourseArticlesButton courseId={courseId} />
            </Flex>

            <ManagedDataGrid<AdminArticleFromList, unknown, AdminCourseArticleExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_COURSE_ARTICLES}
                queryFunction={(params) => articleApi.getAdminArticles(adaptGetAdminCourseArticlesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "courseId", "courseId"]}
                extraFilterParams={{ courseId }}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                onClickCell={handleClickCell}
                columns={columns}
                countName="Статей"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} courseId={courseId} />}
            />
        </Box>
    );
};

export default Articles;
