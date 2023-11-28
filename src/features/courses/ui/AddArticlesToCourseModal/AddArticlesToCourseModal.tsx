import { Flex } from "@mantine/core";
import React, { useState } from "react";
import { Button, ControlButtons, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import {
    AdminArticleFromCourseExtraFilters,
    AdminArticleFromCourseFiltersForm,
    AdminArticleFromList,
    articleApi,
    useAdminArticleFilters,
} from "@entities/article";
import { EntityNames, QueryKeys } from "@shared/constant";
import { useAttachArticlesToCourse } from "@entities/course";
import { columnOrder, columns, filterInitialValues } from "./constants";
import useStyles from "./AddArticlesToCourseModal.styles";
import { adaptGetAdminArticlesRequest } from "./utils";

export interface AddArticlesToCourseModalProps {
    courseId: string;
    onClose: () => void;
}

const AddArticlesToCourseModal = ({ courseId, onClose }: AddArticlesToCourseModalProps) => {
    const { classes } = useStyles();
    const [selected, setSelected] = useState<string[]>([]);

    const articleResources = useAdminArticleFilters();
    const { mutate: attachArticlesToCourse, isLoading } = useAttachArticlesToCourse({ courseId });

    const handleSubmit = () => {
        attachArticlesToCourse(
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
            <ManagedDataGrid<AdminArticleFromList, AdminArticleFromCourseFiltersForm, AdminArticleFromCourseExtraFilters>
                queryKey={[QueryKeys.GET_ADMIN_NO_COURSE_ARTICLES, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.COURSE]]}
                queryFunction={(params) => articleApi.getAdminArticles(adaptGetAdminArticlesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "categoryId", "subcategoryId", "courseId"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Статей"
                extraFilterParams={{ courseId }}
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
                {({ dirty, resetForm, handleSubmit: handleSubmitFilters }) => {
                    const handleResetForm = () => {
                        resetForm({ values: filterInitialValues });
                        handleSubmitFilters();
                    };

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
                                <Button w={164} type="submit" disabled={!dirty}>
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

export default AddArticlesToCourseModal;
