import { Box, Flex, ThemeIcon, Title } from "@mantine/core";
import { Edit3, Eye, PlusCircle, Trash } from "react-feather";
import { useRouter } from "next/router";
import { openModal } from "@mantine/modals";
import { FSearch, MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { FSelect } from "@shared/ui/Forms/Select";
import { Button, ManagedDataGrid } from "@shared/ui";
import { TUser } from "@entities/user/api/types";
import { usersApi } from "@entities/user/api";
import { QueryKeys } from "@shared/constant";
import { columns } from "./constant";
import UserDeleteModal from "./ui/UserDeleteModal/UserDeleteModal";

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

const UserList = () => {
    const router = useRouter();
    const { page, isActive, search, perPage, sort } = router.query as {
        page: string;
        isActive: string;
        search: string;
        perPage: string;
        sort: string;
    };
    const filters = {
        isActive: isActive ?? "",
        search: search ?? "",
    };

    const openModalDeleteUser = (id: number, fio: string) => {
        openModal({
            modalId: `${id}`,
            title: "Удаление пользователя",
            centered: true,
            children: <UserDeleteModal id={id} fio={fio} />,
        });
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
                    queryKey={[QueryKeys.GET_USERS, page, isActive, search, perPage, sort]}
                    manualSorting
                    columns={columns}
                    filters={filters}
                    getData={usersApi.getUsers}
                    countName="Учеников"
                    initialState={{
                        columnOrder: ["id", "fullName", "roleName", "email", "isActive", "mrt-row-actions"],
                    }}
                    enablePinning
                    renderRowActions={({ row }) => {
                        return (
                            <MenuDataGrid>
                                <MenuItemDataGrid closeMenuOnClick={false}>
                                    Деактивировать <Switch variant="primary" />
                                </MenuItemDataGrid>
                                <MenuItemDataGrid>
                                    <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                                        <Eye />
                                    </ThemeIcon>
                                    Открыть
                                </MenuItemDataGrid>
                                <MenuItemDataGrid>
                                    <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                                        <Edit3 />
                                    </ThemeIcon>
                                    Редактировать
                                </MenuItemDataGrid>
                                <MenuItemDataGrid onClick={() => openModalDeleteUser(row.original.id, row.original.fullName)}>
                                    <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                                        <Trash />
                                    </ThemeIcon>
                                    Удалить
                                </MenuItemDataGrid>
                            </MenuDataGrid>
                        );
                    }}
                    enableColumnFilterModes
                    enableRowActions
                    enableRowSelection>
                    <Box mb={24}>
                        <Flex columnGap={8} rowGap={0}>
                            <FSearch w={380} size="sm" name="search" placeholder="Поиск" />
                            <FSelect name="role" size="sm" data={testDataSelect} clearable label="Select" />
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

export default UserList;
