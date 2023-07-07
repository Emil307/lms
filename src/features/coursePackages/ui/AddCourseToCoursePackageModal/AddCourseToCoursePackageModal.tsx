import { Box, Collapse, Flex, Group, ThemeIcon } from "@mantine/core";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { Button, FMultiSelect, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import { AdminCourseFromCoursePackageFilters, useAttachCourseToCoursePackage } from "@entities/coursePackage";
import { AdminCourseFromList, AdminCoursesForCoursePackageFiltersForm, courseApi, useAdminCourseResources } from "@entities/course";
import { QueryKeys } from "@shared/constant";
import { columnOrder, columns, filterInitialValues } from "./constants";
import { adaptGetAdminCoursesRequest } from "./utils";
import useStyles from "./AddCourseToCoursePackageModal.styles";

export interface AddCourseToCoursePackageModalProps {
    coursePackageId: string;
    onClose: () => void;
}

const AddCourseToCoursePackageModal = ({ coursePackageId, onClose }: AddCourseToCoursePackageModalProps) => {
    const { classes } = useStyles();
    const [openedFilters, setOpenedFilters] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);

    const courseResources = useAdminCourseResources({ type: "select" });
    const attachCoursesToPackage = useAttachCourseToCoursePackage(coursePackageId);

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
        attachCoursesToPackage.mutate(
            { ids: selected },
            {
                onSuccess: () => {
                    onClose();
                },
            },
        );
    };

    return (
        <Box>
            <ManagedDataGrid<AdminCourseFromList, AdminCoursesForCoursePackageFiltersForm, AdminCourseFromCoursePackageFilters>
                queryKey={QueryKeys.GET_ADMIN_COURSES}
                queryFunction={(params) => courseApi.getAdminCourses(adaptGetAdminCoursesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "categoryId", "subcategoryId", "tags", "coursePackageId"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderActiveBadge={(cell) => cell.row.original.isActive}
                columns={columns}
                countName="Курсов"
                extraFilterParams={{ coursePackageId }}
                initialState={{
                    columnOrder,
                }}
                disableQueryParams
                onChangeSelect={setSelected}>
                {({ dirty, resetForm, handleSubmit: handleSubmitFilters }) => {
                    const handleResetForm = () => {
                        resetForm({ values: filterInitialValues });
                        handleSubmitFilters();
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
                                        disabled={courseResources.isLoading || !courseResources.data?.categories.length}
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
                                        label="Подкатегория"
                                        disabled={courseResources.isLoading || !courseResources.data?.subcategories.length}
                                        w="100%"
                                        maw={210}
                                    />
                                    <FMultiSelect
                                        w={210}
                                        name="tags"
                                        data={prepareOptionsForSelect({
                                            data: courseResources.data?.tags,
                                            value: "id",
                                            label: "name",
                                        })}
                                        label="Теги"
                                        disabled={courseResources.isLoading || !courseResources.data?.tags.length}
                                    />
                                </Group>
                                <Group mt={16}>
                                    <Button type="submit" w="100%" maw={164} disabled={!dirty}>
                                        Найти
                                    </Button>
                                    {dirty && (
                                        <Button variant="white" w="100%" maw={164} onClick={handleResetForm}>
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

export default AddCourseToCoursePackageModal;
