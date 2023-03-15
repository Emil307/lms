import { Box, Flex, Title } from "@mantine/core";
import { Calendar, PlusCircle, X } from "react-feather";
import { MRT_ColumnDef } from "mantine-react-table";
import { useState } from "react";
import { FormikConfig } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import { Form } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { FSelect } from "@shared/ui/Forms/Select";
import { Button, Input, ManagedDataGrid } from "@shared/ui";
import { Menu } from "@shared/ui/DataGrid/Menu";
import { MenuItem } from "@shared/ui/DataGrid/MenuItem";
import { defaultTheme } from "@app/providers/Theme/theme";
import { DataGridResponse } from "@shared/ui/DataGrid/types";
import { TUser } from "./types";

const getUsers = async (page?: string, isActive?: string): Promise<DataGridResponse<TUser>> => {
    return axios.get("https://gallery-back.addamant-work.ru/api/users", {
        params: {
            page: page,
            isActive: isActive,
        },
    });
};

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
        Cell: ({ cell }) => <>{cell.getValue()}</>,
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

export const UserIndexPage = () => {
    const router = useRouter();
    const { page, isActive } = router.query;
    const [selectValue, setSelectValue] = useState("");

    const handlerChangeSelect = (value: string) => {
        setSelectValue(value);
    };

    const cfg: FormikConfig<any> = {
        initialValues: {
            email: "",
            status: "",
        },
        onSubmit: async (values, _helpers) => {
            router.push(
                {
                    pathname: router.pathname,
                    query: { ...router.query, isActive: `${values.status}`, page: "1" },
                },
                undefined,
                { shallow: true }
            );
        },
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
                <ManagedDataGrid<TUser>
                    queryKey={[QueryKeys.GET_USERS, page as string, isActive as string]}
                    columns={columns}
                    getData={() => getUsers(page as string, isActive as string)}
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
                    // renderRowActions={({ row, table }) => {
                    //     return (
                    //         <ActionIcon sx={{borderRadius: "50%"}}>
                    //             <MoreVertical size={16} />
                    //         </ActionIcon>
                    //     );
                    // }}
                    enableRowActions
                    enableRowSelection
                    initialState={
                        {
                            // columnOrder: [
                            //     "id",
                            //     "действия"
                            // ]
                        }
                    }>
                    <Box mb={24}>
                        <Form<TUser> config={cfg}>
                            <Flex gap={8}>
                                <Input size="sm" label="Replace to Search" />
                                <FSelect
                                    name="role"
                                    size="sm"
                                    data={testDataSelect}
                                    clearable
                                    label="Select"
                                    value={selectValue}
                                    onChange={handlerChangeSelect}
                                />
                            </Flex>
                            <Box>
                                <FRadioGroup name="status">
                                    {radioGroupValues.map((item) => {
                                        return <Radio key={item.id} label={item.label} value={item.value} defaultValue="" />;
                                    })}
                                </FRadioGroup>
                            </Box>
                            <Button mt={8} type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Box>
                </ManagedDataGrid>
            </Box>
        </Box>
    );
};
