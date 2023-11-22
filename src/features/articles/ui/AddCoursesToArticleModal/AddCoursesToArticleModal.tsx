import { Flex } from "@mantine/core";
import React, { useState } from "react";
import { Button, ControlButtons, FMultiSelect, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import { useAttachCoursesToArticle } from "@entities/article";
import { QueryKeys } from "@shared/constant";
import {
    AdminArticleCoursesExtraFilters,
    AdminCourseFromList,
    AdminCoursesNoIncludedArticleFiltersForm,
    courseApi,
    useAdminCourseResources,
} from "@entities/course";
import { columnOrder, columns, filterInitialValues } from "./constants";
import useStyles from "./AddCoursesToArticleModal.styles";
import { adaptGetAdminCoursesRequest } from "./utils";

export interface AddCoursesToArticleModalProps {
    articleId: string;
    onClose: () => void;
}

const AddCoursesToArticleModal = ({ articleId, onClose }: AddCoursesToArticleModalProps) => {
    const { classes } = useStyles();
    const [selected, setSelected] = useState<string[]>([]);

    const courseResources = useAdminCourseResources({ type: "select" });
    const { mutate: attachCoursesToArticle, isLoading } = useAttachCoursesToArticle(articleId);

    const handleSubmit = () => {
        attachCoursesToArticle(
            { courseIds: selected },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <>
            <ManagedDataGrid<AdminCourseFromList, AdminCoursesNoIncludedArticleFiltersForm, AdminArticleCoursesExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_NO_ARTICLE_COURSES}
                queryFunction={(params) => courseApi.getAdminCourses(adaptGetAdminCoursesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "categoryId", "subcategoryId", "tagIds", "articleId"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Материалов"
                extraFilterParams={{ articleId: articleId }}
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
                {({ dirty, resetForm, handleSubmit }) => {
                    const handleResetForm = () => {
                        resetForm({ values: filterInitialValues });
                        handleSubmit();
                    };

                    return (
                        <Flex className={classes.filterWrapper}>
                            <Flex className={classes.filterSearchAndSelects}>
                                <FSearch name="query" placeholder="Поиск" size="sm" className={classes.filterSearch} />
                                <FSelect
                                    name="categoryId"
                                    label="Категория"
                                    data={prepareOptionsForSelect({
                                        data: courseResources.data?.categories,
                                        value: "id",
                                        label: "name",
                                    })}
                                    size="sm"
                                    className={classes.filterSelect}
                                    clearable
                                    disabled={courseResources.isLoading || !courseResources.data?.categories.length}
                                />
                                <FSelect
                                    name="subcategoryId"
                                    label="Подкатегория"
                                    data={prepareOptionsForSelect({
                                        data: courseResources.data?.subcategories,
                                        value: "id",
                                        label: "name",
                                    })}
                                    size="sm"
                                    className={classes.filterSelect}
                                    clearable
                                    disabled={courseResources.isLoading || !courseResources.data?.subcategories.length}
                                />
                                <FMultiSelect
                                    name="tagIds"
                                    label="Теги"
                                    data={prepareOptionsForSelect({
                                        data: courseResources.data?.tags,
                                        value: "id",
                                        label: "name",
                                    })}
                                    className={classes.filterSelect}
                                    clearable
                                    disabled={courseResources.isLoading || !courseResources.data?.tags.length}
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

export default AddCoursesToArticleModal;
