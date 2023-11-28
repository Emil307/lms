import { Box, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FDateRangePicker, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { EntityNames, QueryKeys } from "@shared/constant";
import {
    AdminArticlePackageFromList,
    AdminArticlePackagesFiltersForm,
    articlePackageApi,
    useAdminArticlePackageFilters,
} from "@entities/articlePackage";
import { useMedia } from "@shared/utils";
import { columnOrder, columns, filterInitialValues, radioGroupValues } from "./constant";
import { ListMenu } from "./components";
import { adaptGetAdminArticlePackagesRequest } from "./utils";
import useStyles from "./AdminList.styles";

const AdminList = () => {
    const router = useRouter();
    const { classes } = useStyles();
    const isMobile = useMedia("sm");

    const articlePackageFilters = useAdminArticlePackageFilters();

    const handleClickCell = (cell: MRT_Cell<AdminArticlePackageFromList>) => {
        router.push({ pathname: "/admin/settings/article-packages/[id]", query: { id: cell.row.original.id.toString() } });
    };

    return (
        <Box>
            <ManagedDataGrid<AdminArticlePackageFromList, AdminArticlePackagesFiltersForm>
                queryKey={[QueryKeys.GET_ADMIN_ARTICLE_PACKAGES, [EntityNames.ARTICLE_PACKAGE, EntityNames.CATEGORY]]}
                queryFunction={(params) => articlePackageApi.getAdminArticlePackages(adaptGetAdminArticlePackagesRequest(params))}
                queryCacheKeys={[
                    "page",
                    "perPage",
                    "sort",
                    "isActive",
                    "query",
                    "categoryId",
                    "createdAtFrom",
                    "createdAtTo",
                    "discountFinishingDateFrom",
                    "discountFinishingDateTo",
                ]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                onClickCell={handleClickCell}
                columns={columns}
                countName="Пакетов"
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
                                    name="categoryId"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: articlePackageFilters.data?.categories,
                                        value: "id",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Категория"
                                    className={classes.filterSelect}
                                    disabled={articlePackageFilters.isLoading || !articlePackageFilters.data?.categories.length}
                                />

                                <FDateRangePicker
                                    name="createdAtFrom"
                                    nameTo="createdAtTo"
                                    label="Дата создания"
                                    size="sm"
                                    clearable
                                    className={classes.filterDateRangePicker}
                                />
                                <FDateRangePicker
                                    name="discountFinishingDateFrom"
                                    nameTo="discountFinishingDateTo"
                                    label="Период действия"
                                    size="sm"
                                    clearable
                                    className={classes.filterDateRangePicker}
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
