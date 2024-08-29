import { Box, Flex } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { MRT_Cell } from "mantine-react-table";
import { FDateRangePicker, FMultiSelect, FSearch, FSelect, ManagedDataGrid, Button } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { useUserRole } from "@entities/auth";
import { EntityNames, QueryKeys } from "@shared/constant";
import { Roles } from "@app/routes";
import { AdminCourseFromList, AdminCoursesFiltersForm, courseApi } from "@entities/course";
import { useMedia } from "@shared/utils";
import { radioGroupValues } from "./constants";
import { ListMenu } from "./components";
import useStyles from "./List.styles";
import { useCourseListData } from "./utils";

const List = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const userRole = useUserRole();

    const { adaptGetAdminCoursesRequest, columns, columnOrder, filterInitialValues, renderBadge, optionsForSelects, isLoadingFilters } =
        useCourseListData(userRole);

    const isMobile = useMedia("sm");

    const handleClickCell = (cell: MRT_Cell<AdminCourseFromList>) => {
        router.push({ pathname: "/admin/courses/[id]", query: { id: String(cell.row.original.id) } });
    };

    if (!userRole) {
        return null;
    }

    return (
        <Box>
            <ManagedDataGrid<AdminCourseFromList, Partial<AdminCoursesFiltersForm>>
                queryKey={[QueryKeys.GET_ADMIN_COURSES, [EntityNames.COURSE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER]]}
                queryFunction={(params) => courseApi.getAdminCourses(adaptGetAdminCoursesRequest(params))}
                queryCacheKeys={[
                    "page",
                    "perPage",
                    "sort",
                    "query",
                    "isActive",
                    "tags",
                    "teachers",
                    "category",
                    "discountType",
                    "createdAtFrom",
                    "createdAtTo",
                ]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                onClickCell={handleClickCell}
                renderRowActions={({ row }) => <ListMenu row={row} />}
                renderBadge={renderBadge()}
                columns={columns}
                accessRole={userRole}
                countName="Курсов"
                initialState={{
                    columnOrder,
                }}
                collapsedFiltersBlockProps={{
                    isCollapsed: isMobile,
                }}>
                {({ dirty, handleReset }) => {
                    return (
                        <Flex className={classes.filterWrapper}>
                            <Flex className={classes.filterSearchAndSelects}>
                                <FSearch className={classes.filterSearch} size="sm" name="query" placeholder="Поиск" />
                                <FSelect
                                    className={classes.filterSelect}
                                    name="category"
                                    size="sm"
                                    data={optionsForSelects.categories}
                                    clearable
                                    label="Категория"
                                    disabled={isLoadingFilters}
                                />
                                <FMultiSelect
                                    className={classes.filterSelect}
                                    name="tags"
                                    data={optionsForSelects.tags}
                                    label="Теги"
                                    disabled={isLoadingFilters}
                                />

                                {userRole !== Roles.teacher && (
                                    <>
                                        <FMultiSelect
                                            className={classes.filterSelect}
                                            name="teachers"
                                            data={optionsForSelects.teachers}
                                            label="Преподаватели"
                                            disabled={isLoadingFilters}
                                        />
                                        <FDateRangePicker
                                            className={classes.filterDateRangePicker}
                                            name="createdAtFrom"
                                            nameTo="createdAtTo"
                                            label="Дата создания"
                                            size="sm"
                                            disabled={isLoadingFilters}
                                            allowSingleDateInRange
                                        />
                                    </>
                                )}

                                <FSelect
                                    className={classes.filterSelect}
                                    name="discountType"
                                    size="sm"
                                    data={optionsForSelects.discountTypes}
                                    clearable
                                    label="Скидка"
                                    disabled={isLoadingFilters}
                                />
                            </Flex>

                            {userRole !== Roles.teacher && (
                                <FRadioGroup name="isActive" className={classes.filterRadioGroup}>
                                    {radioGroupValues.map((item) => {
                                        return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                                    })}
                                </FRadioGroup>
                            )}

                            <Flex gap={16}>
                                <Button type="submit" w={164}>
                                    Найти
                                </Button>
                                {dirty && (
                                    <Button type="button" variant="border" onClick={handleReset} w={164}>
                                        Сбросить
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

export default List;
