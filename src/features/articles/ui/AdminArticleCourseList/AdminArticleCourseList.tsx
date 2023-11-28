import { Box, BoxProps, Flex } from "@mantine/core";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { EntityNames, QueryKeys } from "@shared/constant";
import { AdminArticleCoursesExtraFilters, AdminCourseFromList, courseApi } from "@entities/course";
import { useUserRole } from "@entities/auth";
import { Roles } from "@app/routes";
import { AddArticleCourseButton, ListMenu } from "./components";
import { useArticleCoursesListData } from "./utils";
import useStyles from "./AdminArticleCourseList.styles";

export interface AdminArticleCourseListProps extends BoxProps {
    articleId: string;
}

const AdminArticleCourseList = ({ articleId, ...props }: AdminArticleCourseListProps) => {
    const { classes } = useStyles();

    const userRole = useUserRole();

    const { columns, columnOrder, adaptGetArticleCoursesRequest, renderBadge } = useArticleCoursesListData(userRole);

    return (
        <Box {...props}>
            <Flex className={classes.headingContainer}>
                <Heading order={2}>Привязка к курсу</Heading>
                <AddArticleCourseButton articleId={articleId} hidden={userRole === Roles.teacher} />
            </Flex>
            <ManagedDataGrid<AdminCourseFromList, unknown, AdminArticleCoursesExtraFilters>
                queryKey={[
                    QueryKeys.GET_ADMIN_ARTICLE_COURSES,
                    [EntityNames.COURSE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER, EntityNames.ARTICLE],
                ]}
                queryFunction={(params) => courseApi.getAdminCourses(adaptGetArticleCoursesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "articleId"]}
                extraFilterParams={{ articleId }}
                renderBadge={renderBadge()}
                columns={columns}
                accessRole={userRole}
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
