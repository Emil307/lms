import { Box, Flex, Title } from "@mantine/core";
import { PlusCircle } from "react-feather";
import React from "react";
import { FDateRangePicker, FMultiSelect, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminCourse, AdminCoursesFiltersForm, courseApi, useAdminCourseResources } from "@entities/course";
import { radioGroupValues, filterInitialValues, columns } from "./constant";
import { adaptGetAdminCoursesRequest } from "./utils";

const AdminList = () => {
    const { data: coursesFilters, isLoading: isLoadingFilters } = useAdminCourseResources();

    return (
        <Box>
            <Flex align="center" justify="space-between">
                <Title>Курсы</Title>
                <Button variant="secondary" size="large" leftIcon={<PlusCircle />}>
                    Создать курс
                </Button>
            </Flex>

            <Box mt={24}>
                <ManagedDataGrid<AdminCourse, AdminCoursesFiltersForm>
                    disableQueryParams={false}
                    queryKey={QueryKeys.GET_ADMIN_COURSES}
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
                    renderActiveBadge={(cell) => cell.row.original.isActive}
                    columns={columns}
                    countName="Пользователей"
                    initialState={{
                        columnOrder: [
                            "id",
                            "name",
                            "category.name",
                            "tags",
                            "createdAt",
                            "teachers",
                            "price",
                            "discount.amount",
                            "discountPrice",
                            "mrt-row-actions",
                        ],
                    }}>
                    <Box mb={24}>
                        <Flex columnGap={8} rowGap={0}>
                            <FSearch w={512} size="sm" name="query" placeholder="Поиск" />
                            <FSelect
                                w={252}
                                name="category"
                                size="sm"
                                data={prepareOptionsForSelect({ data: coursesFilters?.categories, value: "id", label: "name" })}
                                clearable
                                label="Категория"
                                disabled={isLoadingFilters}
                            />
                            <FMultiSelect
                                w={252}
                                name="tags"
                                data={prepareOptionsForSelect({ data: coursesFilters?.tags, value: "id", label: "name" })}
                                label="Теги"
                                disabled={isLoadingFilters}
                            />
                            <FMultiSelect
                                w={252}
                                name="teachers"
                                data={prepareOptionsForSelect({
                                    data: coursesFilters?.teachers,
                                    value: "id",
                                    label: (data) => `${data.profile.lastName} ${data.profile.firstName}`,
                                })}
                                label="Преподаватели"
                                disabled={isLoadingFilters}
                            />
                            <FDateRangePicker name="createdAtFrom" nameTo="createdAtTo" label="Дата создания" size="sm" />
                        </Flex>
                        <Box mt={16}>
                            <FSelect
                                w={252}
                                name="discountType"
                                size="sm"
                                data={prepareOptionsForSelect({ data: coursesFilters?.discountTypes, value: "type", label: "name" })}
                                clearable
                                label="Скидка"
                                disabled={isLoadingFilters}
                            />
                        </Box>
                        <Box mt={16}>
                            <FRadioGroup name="isActive" defaultValue="">
                                {radioGroupValues.map((item) => {
                                    return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                                })}
                            </FRadioGroup>
                        </Box>
                        <Button w={164} mt={16} type="submit">
                            Найти
                        </Button>
                    </Box>
                </ManagedDataGrid>
            </Box>
        </Box>
    );
};

export default AdminList;
