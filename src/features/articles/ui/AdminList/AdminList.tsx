import { Box, BoxProps, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";
import { FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminArticleFromList, AdminArticlesFiltersForm, articleApi, useAdminArticleFilters } from "@entities/article";
import { columns, radioGroupValues, filterInitialValues, columnOrder } from "./constants";
import { ListMenu } from "./components";
import { adaptGetAdminArticlesRequest } from "./utils";
import useStyles from "./AdminList.styles";

export interface AdminListProps extends Omit<BoxProps, "children"> {}

const AdminList = (props: AdminListProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const isMobile = useMediaQuery("(max-width: 744px)");

    const articleResources = useAdminArticleFilters();

    const handleClickCell = (cell: MRT_Cell<AdminArticleFromList>) => {
        router.push({ pathname: "/admin/articles/[id]", query: { id: cell.row.original.id.toString() } });
    };

    return (
        <Box {...props}>
            <ManagedDataGrid<AdminArticleFromList, AdminArticlesFiltersForm>
                queryKey={QueryKeys.GET_ADMIN_ARTICLES}
                queryFunction={(params) => articleApi.getAdminArticles(adaptGetAdminArticlesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "isActive", "query", "categoryId", "subcategoryId", "courseIds"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                onClickCell={handleClickCell}
                columns={columns}
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
                            <FRadioGroup name="isActive" defaultValue="" className={classes.filterRadioGroup}>
                                {radioGroupValues.map((item) => (
                                    <Radio size="md" key={item.id} label={item.label} value={item.value} />
                                ))}
                            </FRadioGroup>
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
