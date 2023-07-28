import { Box, BoxProps, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";
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
import useStyles from "./AdminList.styles";

export interface AdminListProps extends BoxProps {}

const AdminList = (props: AdminListProps) => {
    const router = useRouter();
    const { classes } = useStyles();

    const isMobile = useMediaQuery("(max-width: 744px)");

    const courseCollectionFilters = useAdminCourseCollectionResources({ type: "select" });

    const handleClickCell = (cell: MRT_Cell<AdminCourseCollectionFromList>) => {
        router.push({ pathname: "/admin/settings/course-collections/[id]", query: { id: cell.row.original.id.toString() } });
    };

    return (
        <Box {...props}>
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
                                    className={classes.filterSelect}
                                    disabled={courseCollectionFilters.isLoading}
                                />
                                <FDateRangePicker
                                    name="createdAtFrom"
                                    nameTo="createdAtTo"
                                    label="Дата создания"
                                    size="sm"
                                    className={classes.filterDateRangePicker}
                                    clearable
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
