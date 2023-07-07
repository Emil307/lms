import { Box, Group } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FDateRangePicker, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import {
    AdminCourseCollectionFromList,
    AdminCourseCollectionsFiltersForm,
    courseCollectionApi,
    useAdminCourseCollectionResources,
} from "@entities/courseCollection";
import { columnOrder, columns, filterInitialValues, radioGroupValues } from "./constant";
import { ListMenu } from "./components";
import { adaptGetAdminCourseCollectionsRequest } from "./utils";

const AdminList = () => {
    const router = useRouter();

    const courseCollectionFilters = useAdminCourseCollectionResources({ type: "select" });

    const handleClickCell = (cell: MRT_Cell<AdminCourseCollectionFromList>) => {
        router.push({ pathname: "/admin/settings/course-collections/[id]", query: { id: cell.row.original.id.toString() } });
    };

    return (
        <Box>
            <ManagedDataGrid<AdminCourseCollectionFromList, AdminCourseCollectionsFiltersForm>
                queryKey={QueryKeys.GET_ADMIN_COURSE_COLLECTIONS}
                queryFunction={(params) => courseCollectionApi.getAdminCourseCollections(adaptGetAdminCourseCollectionsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "isActive", "query", "courseId", "createdAtFrom", "createdAtTo"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderActiveBadge={(cell) => cell.row.original.isActive}
                onClickCell={handleClickCell}
                columns={columns}
                countName="Подборок"
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
                                    name="courseId"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: courseCollectionFilters.data?.courses,
                                        value: "id",
                                        label: "name",
                                        isActive: "isActive",
                                    })}
                                    clearable
                                    label="Входящие курсы"
                                    disabled={courseCollectionFilters.isLoading}
                                    w="100%"
                                    maw={252}
                                />
                                <FDateRangePicker name="createdAtFrom" nameTo="createdAtTo" label="Дата создания" size="sm" clearable />
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
