import { Box, Flex, Title } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FSearch, FSelect } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { TUser, UsersFilters } from "@entities/user/api/types";
import { useAdminUsersFilters, usersApi } from "@entities/user";
import { QueryKeys } from "@shared/constant";
import { columns, filterInitialValues, radioGroupValues } from "./constant";
import { $validationSchema } from "./types/validation";
import { UsersListMenu } from "./components";
import { ManagedDataGrid } from "@shared/ui";

const UserList = () => {
    const router = useRouter();
    const userFilters = useAdminUsersFilters();

    const rolesSelectOption = userFilters.data?.roles.map((item) => {
        return {
            value: item.name,
            label: item.displayName,
        };
    });

    const pushOnUserDetail = (id: number) => {
        router.push({ pathname: "/admin/users/[id]", query: { id: String(id) } });
    };

    const handlerClickCell = (cell: MRT_Cell<TUser>) => {
        pushOnUserDetail(cell.row.original.id);
    };

    const pushOnCreateUser = () => {
        router.push("/admin/users/create");
    };

    return (
        <Box>
            <Flex align="center" justify="space-between">
                <Title>Пользователи</Title>
                <Button onClick={pushOnCreateUser} variant="secondary" size="large" leftIcon={<PlusCircle />}>
                    Создать пользователя
                </Button>
            </Flex>

            <Box mt={24}>
                <ManagedDataGrid<TUser, UsersFilters>
                    queryKey={QueryKeys.GET_USERS}
                    queryFunction={(params) => usersApi.getAdminUsers(params)}
                    queryCacheKeys={["page", "perPage", "sort", "roleName", "isActive", "query"]}
                    filter={{
                        initialValues: filterInitialValues,
                        validationSchema: $validationSchema,
                    }}
                    renderActiveBadge={(cell) => cell.row.original.isActive}
                    onClickCell={handlerClickCell}
                    columns={columns}
                    countName="Пользователей"
                    initialState={{
                        columnOrder: ["id", "fullName", "roleName", "email", "isActive", "mrt-row-actions"],
                    }}
                    renderRowActions={({ row }) => {
                        return <UsersListMenu row={row} />;
                    }}>
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
                                    disabled={userFilters.isLoading}
                                />
                            </Flex>
                            <Box mt={16}>
                                <FRadioGroup name="isActive" defaultValue="">
                                    {radioGroupValues.map((item) => {
                                        return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                                    })}
                                </FRadioGroup>
                            </Box>
                            <Flex gap={16} mt={16}>
                                <Button w={164} type="submit">
                                    Найти
                                </Button>
                                {dirty && (
                                    <Button type="button" variant="white" onClick={resetForm} w={164}>
                                        Cбросить
                                    </Button>
                                )}
                            </Flex>
                        </Box>
                    )}
                </ManagedDataGrid>
            </Box>
        </Box>
    );
};

export default UserList;
