import { Box, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { Button, FDateRangePicker, FRadioGroup, FSearch, FSelect, ManagedDataGrid, Radio, prepareOptionsForSelect } from "@shared/ui";
import { EntityNames, FilterTypes, QueryKeys } from "@shared/constant";
import {
    AdminCoursePackageFromList,
    AdminCoursePackagesFiltersForm,
    coursePackageApi,
    useAdminCoursePackageResourses,
} from "@entities/coursePackage";
import { useMedia } from "@shared/utils";
import { columnOrder, columns, filterInitialValues, radioGroupValues } from "./constant";
import { ListMenu } from "./components";
import { adaptGetAdminCoursePackagesRequest } from "./utils";
import useStyles from "./AdminList.styles";

const AdminList = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const isMobile = useMedia("sm");

    const coursePackageResources = useAdminCoursePackageResourses({ type: FilterTypes.SELECT });

    const handleClickCell = (cell: MRT_Cell<AdminCoursePackageFromList>) => {
        router.push({ pathname: "/admin/settings/course-packages/[id]", query: { id: cell.row.original.id.toString() } });
    };

    return (
        <Box>
            <ManagedDataGrid<AdminCoursePackageFromList, AdminCoursePackagesFiltersForm>
                queryKey={[QueryKeys.GET_ADMIN_COURSE_PACKAGES, [EntityNames.COURSE_PACKAGE, EntityNames.COURSE]]}
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
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                onClickCell={handleClickCell}
                columns={columns}
                countName="Пакетов"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}
                collapsedFiltersBlockProps={{
                    isCollapsed: isMobile,
                }}>
                {({ dirty, resetForm, handleSubmit }) => {
                    const handleResetForm = () => {
                        resetForm({ values: filterInitialValues });
                        handleSubmit();
                    };

                    return (
                        <Flex className={classes.filterWrapper}>
                            <Flex className={classes.filterSearchAndSelects}>
                                <FSearch size="sm" name="query" placeholder="Поиск" className={classes.filterSearch} />
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
                                    className={classes.filterSelect}
                                    disabled={coursePackageResources.isLoading || !coursePackageResources.data?.courses.length}
                                />

                                <FDateRangePicker
                                    name="createdAtFrom"
                                    nameTo="createdAtTo"
                                    label="Дата создания"
                                    size="sm"
                                    clearable
                                    className={classes.filterDateRangePicker}
                                />
                                <FDateRangePicker
                                    name="discountFinishingDateFrom"
                                    nameTo="discountFinishingDateTo"
                                    label="Период действия"
                                    size="sm"
                                    clearable
                                    className={classes.filterDateRangePicker}
                                />
                            </Flex>
                            <FRadioGroup name="isActive" defaultValue="" className={classes.filterRadioGroup}>
                                {radioGroupValues.map((item) => (
                                    <Radio size="md" key={item.id} label={item.label} value={item.value} />
                                ))}
                            </FRadioGroup>
                            <Flex gap={16}>
                                <Button w={164} type="submit">
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
        </Box>
    );
};

export default AdminList;
