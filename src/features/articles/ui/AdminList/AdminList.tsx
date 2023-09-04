import { Box, BoxProps, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminArticleFromList, AdminArticlesFiltersForm, articleApi, useAdminArticleFilters } from "@entities/article";
import { useMedia } from "@shared/utils";
import { radioGroupValues } from "./constants";
import { ListMenu } from "./components";
import { useArticleListData } from "./utils";
import useStyles from "./AdminList.styles";
import { useUserRole } from "@entities/auth";
import { Roles } from "@app/routes";

export interface AdminListProps extends Omit<BoxProps, "children"> {}

const AdminList = (props: AdminListProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const isMobile = useMedia("sm");

    const userRole = useUserRole();

    const { adaptGetAdminArticlesRequest, columns, columnOrder, filterInitialValues, renderBadge } = useArticleListData(userRole);

    const articleResources = useAdminArticleFilters();

    const handleClickCell = (cell: MRT_Cell<AdminArticleFromList>) => {
        router.push({ pathname: "/admin/articles/[id]", query: { id: cell.row.original.id.toString() } });
    };

    return (
        <Box {...props}>
            <ManagedDataGrid<AdminArticleFromList, Partial<AdminArticlesFiltersForm>>
                queryKey={QueryKeys.GET_ADMIN_ARTICLES}
                queryFunction={(params) => articleApi.getAdminArticles(adaptGetAdminArticlesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "isActive", "query", "categoryId", "subcategoryId", "courseIds"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderBadge={renderBadge()}
                onClickCell={handleClickCell}
                columns={columns}
                accessRole={userRole}
                countName="Статей"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}
                collapsedFiltersBlockProps={{
                    isCollapsed: isMobile,
                }}>
                {({ dirty, resetForm, handleSubmit }) => {
                    const handleResetForm = () => {
                        resetForm({ values: filterInitialValues });
                        handleSubmit();
                    };

                    return (
                        <Flex className={classes.filterWrapper}>
                            <Flex className={classes.filterSearchAndSelects}>
                                <FSearch size="sm" name="query" placeholder="Поиск" className={classes.filterSearch} />
                                <FSelect
                                    name="courseIds"
                                    size="sm"
                                    data={prepareOptionsForSelect({ data: articleResources.data?.courses, value: "id", label: "name" })}
                                    clearable
                                    label="Курс"
                                    className={classes.filterSelect}
                                    disabled={articleResources.isLoading || !articleResources.data?.courses.length}
                                />
                                <FSelect
                                    name="categoryId"
                                    size="sm"
                                    data={prepareOptionsForSelect({ data: articleResources.data?.categories, value: "id", label: "name" })}
                                    clearable
                                    label="Категория"
                                    className={classes.filterSelect}
                                    disabled={articleResources.isLoading || !articleResources.data?.categories.length}
                                />
                                <FSelect
                                    name="subcategoryId"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: articleResources.data?.subcategories,
                                        value: "id",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Подкатегория"
                                    className={classes.filterSelect}
                                    disabled={articleResources.isLoading || !articleResources.data?.subcategories.length}
                                />
                            </Flex>

                            {userRole !== Roles.teacher && (
                                <FRadioGroup name="isActive" defaultValue="" className={classes.filterRadioGroup}>
                                    {radioGroupValues.map((item) => (
                                        <Radio size="md" key={item.id} label={item.label} value={item.value} />
                                    ))}
                                </FRadioGroup>
                            )}

                            <Flex gap={16}>
                                <Button w={164} type="submit">
                                    Найти
                                </Button>
                                {dirty && (
                                    <Button type="button" variant="white" onClick={handleResetForm} w={164}>
                                        Cбросить
                                    </Button>
                                )}
                            </Flex>
                        </Flex>
                    );
                }}
            </ManagedDataGrid>
        </Box>
    );
};

export default AdminList;
