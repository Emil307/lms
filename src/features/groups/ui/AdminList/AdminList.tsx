import { Box, BoxProps, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FDateRangePicker, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect, Button } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { AdminGroupFromList, AdminGroupsFiltersForm, groupApi, useAdminGroupFilters } from "@entities/group";
import { EntityNames, FilterTypes, QueryKeys } from "@shared/constant";
import { useMedia } from "@shared/utils";
import { useUserRole } from "@entities/auth/hooks";
import { Roles } from "@shared/types";
import { radioGroupValues } from "./constants";
import { ListMenu } from "./components";
import useStyles from "./AdminList.styles";
import { useGroupListData } from "./utils";

export interface AdminListProps extends Omit<BoxProps, "children"> {}

const AdminList = (props: AdminListProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const isMobile = useMedia("sm");

    const userRole = useUserRole();

    const { columns, columnOrder, filterInitialValues, adaptGetAdminGroupsRequest, renderBadge } = useGroupListData(userRole?.name);

    const groupFilters = useAdminGroupFilters({ type: FilterTypes.SELECT });

    const handleClickCell = (cell: MRT_Cell<AdminGroupFromList>) => {
        router.push({ pathname: "/admin/groups/[id]", query: { id: String(cell.row.original.id) } });
    };

    return (
        <Box {...props}>
            <ManagedDataGrid<AdminGroupFromList, Partial<AdminGroupsFiltersForm>>
                queryKey={[QueryKeys.GET_ADMIN_GROUPS, [EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER, EntityNames.STUDENT]]}
                queryFunction={(params) => groupApi.getAdminGroups(adaptGetAdminGroupsRequest(params))}
                queryCacheKeys={[
                    "page",
                    "perPage",
                    "sort",
                    "courseId",
                    "query",
                    "isActive",
                    "teacherId",
                    "createdAtFrom",
                    "createdAtTo",
                    "statusType",
                ]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderBadge={renderBadge()}
                onClickCell={handleClickCell}
                columns={columns}
                accessRole={userRole?.name}
                countName="Групп"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}
                collapsedFiltersBlockProps={{
                    isCollapsed: isMobile,
                }}>
                {({ dirty, handleReset }) => {
                    return (
                        <Flex className={classes.filterWrapper}>
                            <Flex className={classes.filterSearchAndSelects}>
                                <FSearch  name="query" placeholder="Поиск" className={classes.filterSearch} />
                                <FSelect
                                    name="courseId"
                                    size="sm"
                                    data={prepareOptionsForSelect({ data: groupFilters.data?.courses, value: "id", label: "name" })}
                                    clearable
                                    label="Курс"
                                    className={classes.filterSelect}
                                    disabled={groupFilters.isLoading || !groupFilters.data?.courses.length}
                                />

                                {userRole?.name !== Roles.teacher && (
                                    <>
                                        <FSelect
                                            name="teacherId"
                                            size="sm"
                                            data={prepareOptionsForSelect({
                                                data: groupFilters.data?.teachers,
                                                value: "id",
                                                label: ({ profile }) => [profile.lastName, profile.firstName].join(" "),
                                            })}
                                            clearable
                                            label="Преподаватель"
                                            className={classes.filterSelect}
                                            disabled={groupFilters.isLoading || !groupFilters.data?.teachers.length}
                                        />
                                        <FDateRangePicker
                                            name="createdAtFrom"
                                            nameTo="createdAtTo"
                                            label="Дата создания"
                                            size="sm"
                                            className={classes.filterDateRangePicker}
                                            clearable
                                            allowSingleDateInRange
                                        />
                                    </>
                                )}

                                <FSelect
                                    name="statusType"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: groupFilters.data?.statuses,
                                        value: "type",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Статус группы"
                                    className={classes.filterSelect}
                                    disabled={groupFilters.isLoading || !groupFilters.data?.statuses.length}
                                />
                            </Flex>

                            {userRole?.name !== Roles.teacher && (
                                <FRadioGroup name="isActive" defaultValue="" className={classes.filterRadioGroup}>
                                    {radioGroupValues.map((item) => (
                                        <Radio size="md" key={item.id} label={item.label} value={item.value} />
                                    ))}
                                </FRadioGroup>
                            )}

                            <Flex gap={16}>
                                <Button w={164} type="submit">
                                    Найти
                                </Button>
                                {dirty && (
                                    <Button type="button" variant="border" onClick={handleReset} w={164}>
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
