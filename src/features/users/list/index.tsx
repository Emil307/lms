import { Box, Flex, Title } from "@mantine/core";
import { Calendar, PlusCircle, X } from "react-feather";
import { MRT_ColumnDef } from "mantine-react-table";
import { useRouter } from "next/router";
import { z } from "zod";
import { FInput } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { FSelect } from "@shared/ui/Forms/Select";
import { Button, ManagedDataGrid } from "@shared/ui";
import { Menu } from "@shared/ui/DataGrid/Menu";
import { MenuItem } from "@shared/ui/DataGrid/MenuItem";
import { defaultTheme } from "@app/providers/Theme/theme";
import { TUser } from "@entities/user/api/types";
import { usersApi } from "@entities/user/api";

export enum QueryKeys {
    GET_USERS = "GET_USERS",
}

const columns: MRT_ColumnDef<TUser>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "ФИО",
        accessorKey: "fullName",
    },
    {
        header: "Роль",
        accessorKey: "role",
    },
    {
        header: "Email",
        accessorKey: "email",
    },
    {
        header: "Статус",
        accessorKey: "isActive",
        Cell: ({ cell }) => <>{cell.getValue() ? "Активен" : "Неактивен"}</>,
    },
];

// TODO - брать с бэка, когда будет эндпоинт
const testDataSelect = [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "vue", label: "Vue" },
];

const radioGroupValues = [
    { id: "1", label: "Активен", value: "1" },
    { id: "2", label: "Не активен", value: "0" },
    { id: "3", label: "Все", value: "" },
];

type TFilters = {
    isActive: string;
    search: string;
};

export const $validationSchema = z.object({});

const UserList = () => {
    const router = useRouter();
    const { page, isActive, search, perPage } = router.query as { page: string; isActive: string; search: string; perPage: string };

    const filters = {
        isActive: isActive ?? "",
        search: search ?? "",
    };

    return (
        <Box>
            <Flex align="center" justify="space-between">
                <Title>Пользователи</Title>
                <Button variant="secondary" size="large" leftIcon={<PlusCircle />}>
                    Создать пользователя
                </Button>
            </Flex>

            <Box mt={24}>
                <ManagedDataGrid<TUser, TFilters>
                    queryKey={[QueryKeys.GET_USERS, page, isActive, search, perPage]}
                    columns={columns}
                    filters={filters}
                    getData={usersApi.getUsers}
                    renderRowActionMenuItems={() => (
                        <Menu>
                            <MenuItem>
                                <X size={16} color={defaultTheme.colors?.primary?.[0]} /> Удалить
                            </MenuItem>
                            <MenuItem>
                                <Calendar size={16} color={defaultTheme.colors?.primary?.[0]} /> Добавить
                            </MenuItem>
                        </Menu>
                    )}
                    enableRowActions
                    enableRowSelection>
                    <Box mb={24}>
                        <Flex gap={8}>
                            <FInput size="sm" name="search" label="Поиск" />
                            <FSelect name="role" size="sm" data={testDataSelect} clearable label="Select" />
                        </Flex>
                        <Box>
                            <FRadioGroup name="isActive">
                                {radioGroupValues.map((item) => {
                                    return <Radio key={item.id} label={item.label} value={item.value} defaultValue="" />;
                                })}
                            </FRadioGroup>
                        </Box>
                        <Button mt={8} type="submit">
                            Submit
                        </Button>
                    </Box>
                </ManagedDataGrid>
            </Box>
        </Box>
    );
};

export default UserList;
