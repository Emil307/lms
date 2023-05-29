import { Box, Group } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import {
    Button,
    FDatePicker,
    FDateRangePicker,
    FRadioGroup,
    FSearch,
    FSelect,
    ManagedDataGrid,
    Radio,
    prepareOptionsForSelect,
} from "@shared/ui";
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

const List = () => {
    const router = useRouter();
    const coursePackageResources = useAdminCoursePackageResourses();

    const openCoursePackageDetailPage = (id: number) =>
        router.push({ pathname: "/admin/settings/course-packages/[id]", query: { id: id.toString() } });

    const handleClickCell = (cell: MRT_Cell<AdminCoursePackage>) => {
        openCoursePackageDetailPage(cell.row.original.id);
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
                    "discountFinishingDate",
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
                {({ dirty }) => (
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
                            <FDatePicker name="discountFinishingDate" label="Период действия" size="sm" clearable />
                        </Group>
                        <Box mt={16}>
                            <FRadioGroup name="isActive" defaultValue="">
                                {radioGroupValues.map((item) => {
                                    return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                                })}
                            </FRadioGroup>
                        </Box>
                        <Button mt={16} type="submit" w="100%" maw={164} disabled={!dirty}>
                            Найти
                        </Button>
                    </Box>
                )}
            </ManagedDataGrid>
        </Box>
    );
};

export default List;
