import { Box, Flex, Title } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { DataGrid, FMultiSelect, FSearch, FSelect } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { radioGroupValues, filterInitialValues, columns } from "./constant";
import React from "react";
import { AdminCourse, AdminCoursesFilters, courseApi, useAdminCourseResources } from "@entities/course";

const AdminCoursesList = () => {
    const { data: coursesFilters, isLoading: isLoadingFilters } = useAdminCourseResources();

    const getCategorySelectOptions = () => {
        return coursesFilters?.categories.map((item) => ({
            value: String(item.id),
            label: item.name,
        }));
    };

    const getTagsSelectOptions = () => {
        return coursesFilters?.tags.map((item) => ({
            value: String(item.id),
            label: item.name,
        }));
    };

    const getTeachersSelectOptions = () => {
        return coursesFilters?.teachers.map((item) => ({
            value: String(item.id),
            label: `${item.profile.lastName} ${item.profile.firstName}`,
        }));
    };

    const getDiscountTypesSelectOptions = () => {
        return coursesFilters?.discountTypes.map((item) => ({
            value: item.type,
            label: item.name,
        }));
    };

    return (
        <Box>
            <Flex align="center" justify="space-between">
                <Title>Курсы</Title>
                <Button variant="secondary" size="large" leftIcon={<PlusCircle />}>
                    Создать курс
                </Button>
            </Flex>

            <Box mt={24}>
                <DataGrid<AdminCourse, AdminCoursesFilters>
                    queryKey={QueryKeys.GET_ADMIN_COURSES}
                    queryFunction={(params) => courseApi.getAdminCourses(params)}
                    queryCacheKeys={["page", "perPage", "sort", "query", "isActive", "tags", "teachers", "category", "discountType"]}
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
                                data={getCategorySelectOptions() ?? []}
                                clearable
                                label="Категория"
                                disabled={isLoadingFilters}
                            />
                            <FMultiSelect
                                w={252}
                                name="tags"
                                data={getTagsSelectOptions() ?? []}
                                label="Теги"
                                disabled={isLoadingFilters}
                            />
                            <FMultiSelect
                                w={252}
                                name="teachers"
                                data={getTeachersSelectOptions() ?? []}
                                label="Преподаватели"
                                disabled={isLoadingFilters}
                            />
                            {/*TODO Добавить пикер для даты создания курса*/}
                            {/*<FDateRangePicker name="ranges.dateFrom" nameTo="ranges.dateTo" label="FDateRangePicker" />*/}
                        </Flex>
                        <Box mt={16}>
                            <FSelect
                                w={252}
                                name="discountType"
                                size="sm"
                                data={getDiscountTypesSelectOptions() ?? []}
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
                </DataGrid>
            </Box>
        </Box>
    );
};

export default AdminCoursesList;
