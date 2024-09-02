import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import React from "react";
import { Box, BoxProps, Flex, Title } from "@mantine/core";
import { ManagedDataGrid } from "@shared/ui";
import { EntityNames, QueryKeys } from "@shared/constant";
import { useUserRole } from "@entities/auth";
import { AdminArticleFromList, AdminCourseArticleExtraFilters, articleApi } from "@entities/article";
import { Roles } from "@shared/types";
import { AddCourseArticlesButton, ListMenu } from "./components";
import useStyles from "./Articles.styles";
import { useCourseArticlesListData } from "./utils";

export interface ArticlesProps extends Omit<BoxProps, "children"> {
    courseId: string;
}

const Articles = ({ courseId, ...props }: ArticlesProps) => {
    const router = useRouter();
    const { classes } = useStyles();

    const userRole = useUserRole();

    const { columns, columnOrder, adaptGetAdminCourseArticlesRequest, renderBadge } = useCourseArticlesListData(userRole?.name);

    const handleClickCell = (cell: MRT_Cell<AdminArticleFromList>) => {
        router.push({ pathname: "/admin/articles/[id]", query: { id: cell.row.original.id.toString() } });
    };

    return (
        <Box {...props}>
            <Flex className={classes.heading}>
                <Title order={2} color="dark">
                    Статьи
                </Title>
                <AddCourseArticlesButton courseId={courseId} hidden={userRole?.name === Roles.teacher} />
            </Flex>

            <ManagedDataGrid<AdminArticleFromList, unknown, AdminCourseArticleExtraFilters>
                queryKey={[QueryKeys.GET_ADMIN_COURSE_ARTICLES, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.COURSE]]}
                queryFunction={(params) => articleApi.getAdminArticles(adaptGetAdminCourseArticlesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "courseId", "courseId"]}
                extraFilterParams={{ courseId }}
                renderBadge={renderBadge()}
                onClickCell={handleClickCell}
                columns={columns}
                accessRole={userRole?.name}
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
