import { Box, Collapse, Flex, Group, ThemeIcon } from "@mantine/core";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { Button, FMultiSelect, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
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
    const [openedFilters, setOpenedFilters] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);

    const courseResources = useAdminCourseResources({ type: "select" });
    const attachCoursesToArticle = useAttachCoursesToArticle(articleId);

    const handleToggleVisibilityFilters = () => setOpenedFilters((prevState) => !prevState);

    const renderIconToggleButton = () => {
        if (openedFilters) {
            return (
                <ThemeIcon className={classes.iconToggle}>
                    <ChevronUp />
                </ThemeIcon>
            );
        }
        return (
            <ThemeIcon className={classes.iconToggle}>
                <ChevronDown />
            </ThemeIcon>
        );
    };

    const labelToggleButton = openedFilters ? "Скрыть фильтр" : "Показать фильтр";

    const handleSubmit = () => {
        attachCoursesToArticle.mutate(
            { courseIds: selected },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <Box>
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
                onChangeSelect={setSelected}>
                {({ dirty, resetForm, handleSubmit }) => {
                    const handleResetForm = () => {
                        resetForm({ values: filterInitialValues });
                        handleSubmit();
                    };

                    return (
                        <Box>
                            <Button variant="text" onClick={handleToggleVisibilityFilters} rightIcon={renderIconToggleButton()}>
                                {labelToggleButton}
                            </Button>
                            <Collapse in={openedFilters} mt={16}>
                                <Group sx={{ gap: 8, alignItems: "flex-start" }}>
                                    <FSearch w="100%" maw={210} size="sm" name="query" placeholder="Поиск" />
                                    <FSelect
                                        name="categoryId"
                                        size="sm"
                                        data={prepareOptionsForSelect({
                                            data: courseResources.data?.categories,
                                            value: "id",
                                            label: "name",
                                        })}
                                        clearable
                                        label="Категория"
                                        disabled={courseResources.isLoading}
                                        w="100%"
                                        maw={210}
                                    />
                                    <FSelect
                                        name="subcategoryId"
                                        size="sm"
                                        data={prepareOptionsForSelect({
                                            data: courseResources.data?.subcategories,
                                            value: "id",
                                            label: "name",
                                        })}
                                        clearable
                                        label="Тип"
                                        disabled={courseResources.isLoading}
                                        w="100%"
                                        maw={210}
                                    />
                                    <FMultiSelect
                                        name="tagIds"
                                        label="Теги"
                                        data={prepareOptionsForSelect({
                                            data: courseResources.data?.tags,
                                            value: "id",
                                            label: "name",
                                        })}
                                    />
                                </Group>
                                <Group>
                                    <Button mt={16} type="submit" w="100%" maw={164} disabled={!dirty}>
                                        Найти
                                    </Button>
                                    {dirty && (
                                        <Button mt={16} variant="white" w="100%" maw={164} onClick={handleResetForm}>
                                            Сбросить
                                        </Button>
                                    )}
                                </Group>
                            </Collapse>
                        </Box>
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

export default AddCoursesToArticleModal;
