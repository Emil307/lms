import { Box, Group } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { Button, FDateRangePicker, FRadioGroup, FSearch, FSelect, ManagedDataGrid, Radio, prepareOptionsForSelect } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import {
    AdminCoursePackage,
    AdminCoursePackagesFiltersForm,
    coursePackageApi,
    useAdminCoursePackageResourses,
} from "@entities/coursePackage";
import { columnOrder, columns, filterInitialValues, radioGroupValues } from "./constant";
import { ListMenu } from "./components";
import { adaptGetAdminCoursePackagesRequest } from "./utils";

const AdminList = () => {
    const router = useRouter();
    const coursePackageResources = useAdminCoursePackageResourses({ type: "select" });

    const handleClickCell = (cell: MRT_Cell<AdminCoursePackage>) => {
        router.push({ pathname: "/admin/settings/course-packages/[id]", query: { id: cell.row.original.id.toString() } });
    };

    return (
        <Box>
            <ManagedDataGrid<AdminCoursePackage, AdminCoursePackagesFiltersForm>
                queryKey={QueryKeys.GET_ADMIN_COURSE_PACKAGES}
                queryFunction={(params) => coursePackageApi.getAdminCoursePackages(adaptGetAdminCoursePackagesRequest(params))}
                queryCacheKeys={[
                    "page",
                    "perPage",
                    "sort",
                    "isActive",
                    "query",
                    "createdAtFrom",
                    "createdAtTo",
                    "courseIds",
                    "discountFinishingDateFrom",
                    "discountFinishingDateTo",
                ]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderActiveBadge={(cell) => cell.row.original.isActive}
                onClickCell={handleClickCell}
                columns={columns}
                countName="Пакетов"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}>
                {({ dirty, resetForm, handleSubmit }) => {
                    const handleResetForm = () => {
                        resetForm({ values: filterInitialValues });
                        handleSubmit();
                    };

                    return (
                        <Box mb={24}>
                            <Group sx={{ gap: 8 }}>
                                <FSearch w="100%" maw={512} size="sm" name="query" placeholder="Поиск" />
                                <FSelect
                                    name="courseIds"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: coursePackageResources.data?.courses,
                                        value: "id",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Курс"
                                    disabled={coursePackageResources.isLoading}
                                    w="100%"
                                    maw={252}
                                />
                                <FDateRangePicker name="createdAtFrom" nameTo="createdAtTo" label="Дата создания" size="sm" clearable />
                                <FDateRangePicker
                                    name="discountFinishingDateFrom"
                                    nameTo="discountFinishingDateTo"
                                    label="Период действия"
                                    size="sm"
                                    clearable
                                />
                            </Group>
                            <Box mt={16}>
                                <FRadioGroup name="isActive" defaultValue="">
                                    {radioGroupValues.map((item) => (
                                        <Radio size="md" key={item.id} label={item.label} value={item.value} />
                                    ))}
                                </FRadioGroup>
                            </Box>
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
                        </Box>
                    );
                }}
            </ManagedDataGrid>
        </Box>
    );
};

export default AdminList;
