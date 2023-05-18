import { Box, Flex, Title } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FSearch, ManagedDataGrid } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { Group, groupApi, GroupsListFilters } from "@entities/group";
import { QueryKeys } from "@shared/constant";
import { columns, radioGroupValues, filterInitialValues } from "./constants";
import { GroupsListMenu } from "./components";

const GroupList = () => {
    const router = useRouter();

    const pushOnGroupDetail = (id: number) => {
        router.push({ pathname: "/admin/groups/[id]", query: { id: String(id) } });
    };

    const handlerClickCell = (cell: MRT_Cell<Group>) => {
        pushOnGroupDetail(cell.row.original.id);
    };

    const pushOnCreateOrder = () => router.push("/admin/groups/create");

    return (
        <Box>
            <Flex align="center" justify="space-between">
                <Title order={1} color="dark">
                    Группы
                </Title>
                <Button onClick={pushOnCreateOrder} variant="secondary" size="large" leftIcon={<PlusCircle />}>
                    Создать группу
                </Button>
            </Flex>

            <Box mt={24}>
                <ManagedDataGrid<Group, GroupsListFilters>
                    queryKey={QueryKeys.GET_ADMIN_GROUPS}
                    queryFunction={(params) => groupApi.getAdminGroups(params)}
                    queryCacheKeys={["page", "perPage", "sort", "isActive", "query"]}
                    filter={{
                        initialValues: filterInitialValues,
                    }}
                    renderActiveBadge={(cell) => cell.row.original.isActive}
                    onClickCell={handlerClickCell}
                    columns={columns}
                    countName="Пользователей"
                    initialState={{
                        columnOrder: [
                            "id",
                            "courseName",
                            "createdAt",
                            "name",
                            "students",
                            "education",
                            "teacherFullName",
                            "status",
                            "isActive",
                            "mrt-row-actions",
                        ],
                    }}
                    renderRowActions={({ row }) => {
                        return <GroupsListMenu row={row} />;
                    }}>
                    <Box mb={24}>
                        <Flex columnGap={8} rowGap={0}>
                            <FSearch w={380} size="sm" name="query" placeholder="Поиск" />
                            {/* TODO: Когда будет эндпоинт с фильтрами */}
                        </Flex>
                        <Box mt={16}>
                            <FRadioGroup name="isActive" defaultValue="">
                                {radioGroupValues.map((item) => {
                                    return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                                })}
                            </FRadioGroup>
                        </Box>
                        <Button mt={16} type="submit">
                            Найти
                        </Button>
                    </Box>
                </ManagedDataGrid>
            </Box>
        </Box>
    );
};

export default GroupList;
