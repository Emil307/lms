import { Box, Flex, Group, Title } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FDateRangePicker, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { AdminGroupFromList, AdminGroupsFiltersForm, groupApi, useAdminGroupFilters } from "@entities/group";
import { QueryKeys } from "@shared/constant";
import { columns, radioGroupValues, filterInitialValues, columnOrder } from "./constants";
import { ListMenu } from "./components";
import { adaptGetAdminGroupsRequest } from "./utils";

const AdminList = () => {
    const router = useRouter();

    const groupFilters = useAdminGroupFilters({ type: "select" });

    const handleClickCell = (cell: MRT_Cell<AdminGroupFromList>) => {
        router.push({ pathname: "/admin/groups/[id]", query: { id: String(cell.row.original.id) } });
    };

    const openCreateForm = () => router.push("/admin/groups/create");

    return (
        <Box>
            <Flex align="center" justify="space-between">
                <Title order={1} color="dark">
                    Группы
                </Title>
                <Button onClick={openCreateForm} variant="secondary" size="large" leftIcon={<PlusCircle />}>
                    Создать группу
                </Button>
            </Flex>

            <Box mt={24}>
                <ManagedDataGrid<AdminGroupFromList, AdminGroupsFiltersForm>
                    queryKey={QueryKeys.GET_ADMIN_GROUPS}
                    queryFunction={(params) => groupApi.getAdminGroups(adaptGetAdminGroupsRequest(params))}
                    queryCacheKeys={[
                        "page",
                        "perPage",
                        "sort",
                        "query",
                        "isActive",
                        "courseId",
                        "teacherId",
                        "createdAtFrom",
                        "createdAtTo",
                        "statusType",
                    ]}
                    filter={{
                        initialValues: filterInitialValues,
                    }}
                    renderActiveBadge={(cell) => cell.row.original.isActive}
                    onClickCell={handleClickCell}
                    columns={columns}
                    countName="Групп"
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
                                            data: groupFilters.data?.courses,
                                            value: "id",
                                            label: "name",
                                        })}
                                        clearable
                                        label="Курс"
                                        disabled={groupFilters.isLoading}
                                        w="100%"
                                        maw={252}
                                    />
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
                                        disabled={groupFilters.isLoading}
                                        w="100%"
                                        maw={252}
                                    />
                                    <FDateRangePicker
                                        name="createdAtFrom"
                                        nameTo="createdAtTo"
                                        label="Дата создания"
                                        size="sm"
                                        clearable
                                        w="100%"
                                        maw={252}
                                    />
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
                                        disabled={groupFilters.isLoading}
                                        w="100%"
                                        maw={252}
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
        </Box>
    );
};

export default AdminList;
