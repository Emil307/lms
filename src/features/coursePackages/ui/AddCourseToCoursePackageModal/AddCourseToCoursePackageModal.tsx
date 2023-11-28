import { Flex } from "@mantine/core";
import React, { useState } from "react";
import { Button, ControlButtons, FMultiSelect, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import { AdminCourseFromCoursePackageFilters, useAttachCourseToCoursePackage } from "@entities/coursePackage";
import { AdminCourseFromList, AdminCoursesForCoursePackageFiltersForm, courseApi, useAdminCourseResources } from "@entities/course";
import { EntityNames, FilterTypes, QueryKeys } from "@shared/constant";
import { columnOrder, columns, filterInitialValues } from "./constants";
import { adaptGetAdminCoursesRequest } from "./utils";
import useStyles from "./AddCourseToCoursePackageModal.styles";

export interface AddCourseToCoursePackageModalProps {
    coursePackageId: string;
    onClose: () => void;
}

const AddCourseToCoursePackageModal = ({ coursePackageId, onClose }: AddCourseToCoursePackageModalProps) => {
    const { classes } = useStyles();
    const [selected, setSelected] = useState<string[]>([]);

    const courseResources = useAdminCourseResources({ type: FilterTypes.SELECT });
    const { mutate: attachCoursesToCoursePackage, isLoading } = useAttachCourseToCoursePackage(coursePackageId);

    const handleSubmit = () => {
        attachCoursesToCoursePackage(
            { ids: selected },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <>
            <ManagedDataGrid<AdminCourseFromList, AdminCoursesForCoursePackageFiltersForm, AdminCourseFromCoursePackageFilters>
                queryKey={[
                    QueryKeys.GET_ADMIN_COURSES,
                    [EntityNames.COURSE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER, EntityNames.COURSE_PACKAGE],
                ]}
                queryFunction={(params) => courseApi.getAdminCourses(adaptGetAdminCoursesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "categoryId", "subcategoryId", "tags", "coursePackageId"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Курсов"
                extraFilterParams={{ coursePackageId }}
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
                                    name="tags"
                                    label="Теги"
                                    data={prepareOptionsForSelect({
                                        data: courseResources.data?.tags,
                                        value: "id",
                                        label: "name",
                                    })}
                                    size="sm"
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

export default AddCourseToCoursePackageModal;
