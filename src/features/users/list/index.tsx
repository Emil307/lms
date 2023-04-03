import { Box, CSSObject, Flex, ThemeIcon, Title, useMantineTheme } from "@mantine/core";
import { Edit3, Eye, PlusCircle, Trash } from "react-feather";
import { openModal } from "@mantine/modals";
import { useState } from "react";
import { FormikConfig } from "formik";
import { MRT_Cell, MRT_Row, MRT_SortingState } from "mantine-react-table";
import { useRouter } from "next/router";
import { DataGrid, Form, FSearch, FSelect, MenuDataGrid, MenuItemDataGrid, PaginationDataGrid, Switch } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { TUser } from "@entities/user/api/types";
import { usersApi } from "@entities/user/api";
import { useActivateUser, useDeactivateUser, useUsers } from "@entities/user";
import { useRoles } from "@entities/roles";
import { columns } from "./constant";
import { $validationSchema } from "./types/validation";
import UserDeleteModal from "../UserDeleteModal/UserDeleteModal";

const radioGroupValues = [
    { id: "1", label: "Активен", value: "1" },
    { id: "2", label: "Не активен", value: "0" },
    { id: "3", label: "Все", value: "" },
];

interface TFilters {
    isActive?: "1" | "0" | "";
    query: string;
    role: string;
}

const UserList = () => {
    const router = useRouter();
    const theme = useMantineTheme();
    const [filters, setFilters] = useState({ filters: {}, query: "" });
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data, isLoading, isRefetching, isFetching } = useUsers({
        ...filters,
        sorting,
        perPage: pagination.pageSize,
        page: pagination.pageIndex + 1,
    });

    const totalPage = data?.meta.pagination.total_pages;
    const firstElemIndex = (data?.meta.pagination.per_page ?? 0) * ((data?.meta.pagination.current_page ?? 0) - 1) + 1;
    const lastElemIndex =
        (data?.meta.pagination.per_page ?? 0) * ((data?.meta.pagination.current_page ?? 0) - 1) + (data?.meta.pagination.count ?? 0);

    const openModalDeleteUser = (id: string, fio: string) => {
        openModal({
            modalId: `${id}`,
            title: "Удаление пользователя",
            centered: true,
            children: <UserDeleteModal id={id} fio={fio} />,
        });
    };

    const roles = useRoles();

    const rolesSelectOption = roles.data?.data.map((item) => {
        return {
            value: item.name,
            label: item.display_name,
        };
    });

    const getStylesForCell = (cell: MRT_Cell<TUser>): CSSObject => {
        return {
            ":first-of-type": {
                position: "relative",
                ":before": {
                    content: "''",
                    position: "absolute",
                    backgroundColor: cell.row.original.isActive ? theme.colors.done[0] : theme.colors.light[0],
                    width: 4,
                    borderRadius: "0 8px 8px 0",
                    height: "100%",
                    top: 1,
                    bottom: 1,
                    left: 0,
                },
            },
        };
    };

    const pushOnUserDetail = (id: number) => {
        router.push(`/admin/users/${id}`);
    };

    const handlerClickCell = (cell: MRT_Cell<TUser>) => {
        if (cell.column.id === "mrt-row-actions") return;
        pushOnUserDetail(cell.row.original.id);
    };

    const cfg: FormikConfig<TFilters> = {
        initialValues: { isActive: "", query: "", role: "" },
        enableReinitialize: true,
        validationSchema: $validationSchema,
        onSubmit: async (values) => {
            setFilters({
                query: values.query,
                filters: {
                    ...(values.isActive !== "" && { isActive: values.isActive }),
                    ...(values.role !== "" && { roleName: values.role }),
                },
            });
            setPagination((prev) => {
                return { ...prev, pageIndex: 0 };
            });
        },
    };

    const activateUser = useActivateUser();
    const deactivateUser = useDeactivateUser();

    const toggleActivateUser = async (row: MRT_Row<TUser>) => {
        if (row.original.isActive) {
            await deactivateUser.mutateAsync(String(row.original.id));
            return;
        }
        await activateUser.mutateAsync(String(row.original.id));
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
                <DataGrid<TUser>
                    getStylesForCell={getStylesForCell}
                    manualSorting
                    onSortingChange={setSorting}
                    onClickCell={handlerClickCell}
                    rowCount={data?.meta.pagination.count}
                    state={{
                        isLoading: isLoading || isRefetching || isFetching,
                        pagination: {
                            pageIndex: data?.meta.pagination.current_page || 0,
                            pageSize: data?.meta.pagination.per_page || 10,
                        },
                        sorting,
                    }}
                    pageCount={totalPage || 0}
                    columns={columns}
                    data={data?.data ?? []}
                    getData={usersApi.getUsers}
                    countName="Пользователей"
                    perPage={data?.meta.pagination.per_page}
                    total={data?.meta.pagination.total}
                    initialState={{
                        columnOrder: ["id", "fullName", "roleName", "email", "isActive", "mrt-row-actions"],
                    }}
                    enablePinning
                    renderRowActions={({ row }) => {
                        return (
                            <MenuDataGrid>
                                <MenuItemDataGrid
                                    onClick={() => {
                                        toggleActivateUser(row);
                                    }}
                                    closeMenuOnClick={false}>
                                    Деактивировать <Switch variant="primary" checked={row.original.isActive} />
                                </MenuItemDataGrid>
                                <Box
                                    sx={{
                                        height: 1,
                                        backgroundColor: theme.colors.light[0],
                                        margin: "0 12px",
                                    }}></Box>
                                <MenuItemDataGrid
                                    mt={8}
                                    onClick={() => {
                                        pushOnUserDetail(row.original.id);
                                    }}>
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
                                <MenuItemDataGrid onClick={() => openModalDeleteUser(String(row.original.id), row.original.fullName)}>
                                    <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                                        <Trash />
                                    </ThemeIcon>
                                    Удалить
                                </MenuItemDataGrid>
                            </MenuDataGrid>
                        );
                    }}
                    onPaginationChange={setPagination}
                    enableColumnFilterModes
                    enableRowActions
                    enableRowSelection
                    renderBottomToolbar={({ table }) => {
                        if (!data?.meta.pagination) {
                            return null;
                        }
                        return (
                            <PaginationDataGrid
                                table={table}
                                firstElemIndex={firstElemIndex}
                                lastElemIndex={lastElemIndex}
                                count={totalPage}
                            />
                        );
                    }}>
                    <Form config={cfg}>
                        <Box mb={24}>
                            <Flex columnGap={8} rowGap={0}>
                                <FSearch w={380} size="sm" name="query" placeholder="Поиск" />
                                <FSelect
                                    name="role"
                                    size="sm"
                                    data={rolesSelectOption ?? []}
                                    clearable
                                    label="Роль"
                                    disabled={roles.isLoading}
                                />
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
                    </Form>
                </DataGrid>
            </Box>
        </Box>
    );
};

export default UserList;
