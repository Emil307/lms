import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import React from "react";
import { Box, BoxProps, Flex, Title } from "@mantine/core";
import { ManagedDataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { useUserRole } from "@entities/auth";
import { Roles } from "@app/routes";
import { AdminArticleFromList, AdminCourseArticleExtraFilters, articleApi } from "@entities/article";
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

    const { columns, columnOrder, adaptGetAdminCourseArticlesRequest, renderBadge } = useCourseArticlesListData(userRole);

    const handleClickCell = (cell: MRT_Cell<AdminArticleFromList>) => {
        router.push({ pathname: "/admin/articles/[id]", query: { id: cell.row.original.id.toString() } });
    };

    return (
        <Box {...props}>
            <Flex className={classes.heading}>
                <Title order={2} color="dark">
                    Статьи
                </Title>
                <AddCourseArticlesButton courseId={courseId} hidden={userRole === Roles.teacher} />
            </Flex>

            <ManagedDataGrid<AdminArticleFromList, unknown, AdminCourseArticleExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_COURSE_ARTICLES}
                queryFunction={(params) => articleApi.getAdminArticles(adaptGetAdminCourseArticlesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "courseId", "courseId"]}
                extraFilterParams={{ courseId }}
                renderBadge={renderBadge()}
                onClickCell={handleClickCell}
                columns={columns}
                accessRole={userRole}
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
