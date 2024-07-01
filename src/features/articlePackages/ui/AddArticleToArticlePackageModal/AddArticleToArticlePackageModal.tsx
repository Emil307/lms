import { Flex } from "@mantine/core";
import React, { useState } from "react";
import { Button, ControlButtons, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import {
    AdminArticleFromArticlePackageExtraFilters,
    AdminArticleFromArticlePackageFiltersForm,
    AdminArticleFromList,
    articleApi,
    useAdminArticleFilters,
} from "@entities/article";
import { EntityNames, QueryKeys } from "@shared/constant";
import { useAttachArticleToArticlePackage } from "@entities/articlePackage";
import { columnOrder, columns, filterInitialValues } from "./constants";
import useStyles from "./AddArticleToArticlePackageModal.styles";
import { adaptGetAdminArticlesRequest } from "./utils";

export interface AddArticleToArticlePackageModalProps {
    articlePackageId: string;
    onClose: () => void;
}

const AddArticleToArticlePackageModal = ({ articlePackageId, onClose }: AddArticleToArticlePackageModalProps) => {
    const { classes } = useStyles();
    const [selected, setSelected] = useState<string[]>([]);

    const articleResources = useAdminArticleFilters();
    const { mutate: attachArticlesToArticlePackage, isLoading } = useAttachArticleToArticlePackage(articlePackageId);

    const handleSubmit = () => {
        attachArticlesToArticlePackage(
            { articleIds: selected },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <>
            <ManagedDataGrid<AdminArticleFromList, AdminArticleFromArticlePackageFiltersForm, AdminArticleFromArticlePackageExtraFilters>
                queryKey={[
                    QueryKeys.GET_ADMIN_ARTICLES,
                    [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.COURSE, EntityNames.ARTICLE_PACKAGE],
                ]}
                queryFunction={(params) => articleApi.getAdminArticles(adaptGetAdminArticlesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "categoryId", "subcategoryId", "articlePackageIds"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Статей"
                extraFilterParams={{ articlePackageIds: articlePackageId }}
                initialState={{
                    columnOrder,
                }}
                disableQueryParams
                onChangeSelect={setSelected}
                collapsedFiltersBlockProps={{
                    isCollapsed: true,
                    leftIcon: null,
                    titleOpened: "Показать фильтр",
                    titleClosed: "Скрыть фильтр",
                }}>
                {({ dirty, handleReset }) => {
                    return (
                        <Flex className={classes.filterWrapper}>
                            <Flex className={classes.filterSearchAndSelects}>
                                <FSearch name="query" placeholder="Поиск" size="sm" className={classes.filterSearch} />
                                <FSelect
                                    name="categoryId"
                                    label="Категория"
                                    data={prepareOptionsForSelect({
                                        data: articleResources.data?.categories,
                                        value: "id",
                                        label: "name",
                                    })}
                                    size="sm"
                                    className={classes.filterSelect}
                                    clearable
                                    disabled={articleResources.isLoading || !articleResources.data?.categories.length}
                                />
                                <FSelect
                                    name="subcategoryId"
                                    label="Подкатегория"
                                    data={prepareOptionsForSelect({
                                        data: articleResources.data?.subcategories,
                                        value: "id",
                                        label: "name",
                                    })}
                                    size="sm"
                                    className={classes.filterSelect}
                                    clearable
                                    disabled={articleResources.isLoading || !articleResources.data?.subcategories.length}
                                />
                            </Flex>
                            <Flex gap={16}>
                                <Button w={164} type="submit">
                                    Найти
                                </Button>
                                {dirty && (
                                    <Button type="button" variant="border" onClick={handleReset} w={164}>
                                        Cбросить
                                    </Button>
                                )}
                            </Flex>
                        </Flex>
                    );
                }}
            </ManagedDataGrid>
            <ControlButtons
                variant="modalTable"
                cancelButtonText="Отмена"
                submitButtonText="Добавить"
                onClose={onClose}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                disabledSubmit={!selected.length}
                mt={24}
            />
        </>
    );
};

export default AddArticleToArticlePackageModal;
