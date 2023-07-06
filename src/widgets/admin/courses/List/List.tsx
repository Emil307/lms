import { Box, Flex } from "@mantine/core";
import React, { useMemo } from "react";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FDateRangePicker, FMultiSelect, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminCourseFromList, AdminCoursesFiltersForm, courseApi, useAdminCourseResources } from "@entities/course";
import { radioGroupValues, filterInitialValues, columns } from "./constants";
import { adaptGetAdminCoursesRequest } from "./utils";
import { ListMenu } from "./components";

const List = () => {
    const router = useRouter();
    const { data: coursesFilters, isLoading: isLoadingFilters } = useAdminCourseResources({ type: "select" });

    const handleClickCell = (cell: MRT_Cell<AdminCourseFromList>) => {
        router.push({ pathname: "/admin/courses/[id]", query: { id: String(cell.row.original.id) } });
    };

    const optionsForSelects = useMemo(() => {
        const categories = prepareOptionsForSelect({
            data: coursesFilters?.categories,
            value: "id",
            label: "name",
            emptyOptionLabel: "Без категории",
        });
        const tags = prepareOptionsForSelect({
            data: coursesFilters?.tags,
            value: "id",
            label: "name",
        });
        const teachers = prepareOptionsForSelect({
            data: coursesFilters?.teachers,
            value: "id",
            label: (data) => `${data.profile?.lastName} ${data.profile?.firstName}`,
        });
        const discountTypes = prepareOptionsForSelect({
            data: coursesFilters?.discountTypes,
            value: "type",
            label: "name",
        });

        return { categories, tags, teachers, discountTypes };
    }, [coursesFilters]);

    return (
        <Box mt={24}>
            <ManagedDataGrid<AdminCourseFromList, AdminCoursesFiltersForm>
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
                onClickCell={handleClickCell}
                renderRowActions={({ row }) => <ListMenu row={row} />}
                renderActiveBadge={(cell) => cell.row.original.isActive}
                columns={columns}
                countName="Курсов"
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
                <Box>
                    <Flex columnGap={8} rowGap={0}>
                        <FSearch w={512} size="sm" name="query" placeholder="Поиск" />
                        <FSelect
                            w={252}
                            name="category"
                            size="sm"
                            data={optionsForSelects.categories}
                            clearable
                            label="Категория"
                            disabled={isLoadingFilters}
                        />
                        <FMultiSelect w={252} name="tags" data={optionsForSelects.tags} label="Теги" disabled={isLoadingFilters} />
                        <FMultiSelect
                            w={252}
                            name="teachers"
                            data={optionsForSelects.teachers}
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
                            data={optionsForSelects.discountTypes}
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
    );
};

export default List;
