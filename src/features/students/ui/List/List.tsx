import { Box, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { DataGrid, FSearch, FSelect } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { TUser, UsersFilters } from "@entities/user/api/types";
import { useAdminStudentsFilters, usersApi } from "@entities/user";
import { StudentsListMenu } from "./components/ListMenu";
import { columns, radioGroupValues, filterInitialValues } from "./constant";
import { QueryKeys } from "@shared/constant";

const List = () => {
    const router = useRouter();
    const studentFilters = useAdminStudentsFilters();

    const rolesSelectOption = studentFilters.data?.roles.map((item) => ({
        value: item.name,
        label: item.displayName,
    }));

    const openUserDetailPage = (id: number) => router.push({ pathname: "/admin/students/[id]", query: { id: String(id) } });

    const handlerClickCell = (cell: MRT_Cell<TUser>) => {
        openUserDetailPage(cell.row.original.id);
    };

    return (
        <Box mt={24}>
            <DataGrid<TUser, UsersFilters>
                queryKey={QueryKeys.GET_STUDENTS}
                queryFunction={(params) => usersApi.getAdminUsers(params)}
                queryCacheKeys={["page", "perPage", "sort", "roleName", "isActive", "query"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderActiveBadge={(cell) => cell.row.original.isActive}
                onClickCell={handlerClickCell}
                columns={columns}
                countName="Учеников"
                initialState={{
                    columnOrder: ["id", "fullName", "roleName", "email", "isActive", "mrt-row-actions"],
                }}
                renderRowActions={({ row }) => <StudentsListMenu row={row} />}>
                {({ dirty, resetForm }) => (
                    <Box mb={24}>
                        <Flex columnGap={8} rowGap={0}>
                            <FSearch w={380} size="sm" name="query" placeholder="Поиск" />
                            <FSelect
                                name="roleName"
                                size="sm"
                                data={rolesSelectOption ?? []}
                                clearable
                                label="Роль"
                                disabled={studentFilters.isLoading}
                            />
                        </Flex>
                        <Box mt={16}>
                            <FRadioGroup name="isActive" defaultValue="">
                                {radioGroupValues.map((item) => (
                                    <Radio size="md" key={item.id} label={item.label} value={item.value} />
                                ))}
                            </FRadioGroup>
                        </Box>
                        <Flex gap={16} mt={16}>
                            <Button type="submit" w="100%" maw={164}>
                                Найти
                            </Button>
                            {dirty && (
                                <Button type="button" variant="white" onClick={resetForm} w="100%" maw={164}>
                                    Cбросить
                                </Button>
                            )}
                        </Flex>
                    </Box>
                )}
            </DataGrid>
        </Box>
    );
};

export default List;
