import { Box, BoxProps, Flex } from "@mantine/core";
import React, { useState } from "react";
import { Button, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import {
    AdminArticleFromCourseExtraFilters,
    AdminArticleFromCourseFiltersForm,
    AdminArticleFromList,
    articleApi,
    useAdminArticleFilters,
} from "@entities/article";
import { QueryKeys } from "@shared/constant";
import { useAttachArticlesToCourse } from "@entities/course";
import { columnOrder, columns, filterInitialValues } from "./constants";
import useStyles from "./AddArticlesToCourseModal.styles";
import { adaptGetAdminArticlesRequest } from "./utils";

export interface AddArticlesToCourseModalProps extends Omit<BoxProps, "children"> {
    courseId: string;
    onClose: () => void;
}

const AddArticlesToCourseModal = ({ courseId, onClose, ...props }: AddArticlesToCourseModalProps) => {
    const { classes } = useStyles();
    const [selected, setSelected] = useState<string[]>([]);

    const articleResources = useAdminArticleFilters();
    const attachArticlesToCourse = useAttachArticlesToCourse({ courseId });

    const handleSubmit = () => {
        attachArticlesToCourse.mutate(
            { articleIds: selected },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <Box {...props}>
            <ManagedDataGrid<AdminArticleFromList, AdminArticleFromCourseFiltersForm, AdminArticleFromCourseExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_NO_COURSE_ARTICLES}
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
            <Flex justify="space-between" mt={14} gap={8}>
                <Button variant="border" size="large" onClick={onClose} w="100%" maw={252}>
                    Отмена
                </Button>
                <Button variant="secondary" size="large" w="100%" maw={252} onClick={handleSubmit} disabled={!selected}>
                    Добавить
                </Button>
            </Flex>
        </Box>
    );
};

export default AddArticlesToCourseModal;
