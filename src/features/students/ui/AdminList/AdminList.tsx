import { Box, BoxProps, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FSearch, FSelect, ManagedDataGrid } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { AdminStudentsFiltersForm, UserFromList } from "@entities/user/api/types";
import { useAdminStudentsFilters, userApi } from "@entities/user";
import { QueryKeys } from "@shared/constant";
import { StudentsListMenu } from "./components/ListMenu";
import { columns, radioGroupValues, filterInitialValues } from "./constant";
import { adaptGetAdminStudentsRequest } from "./utils";

export interface AdminListProps extends BoxProps {}

const AdminList = (props: AdminListProps) => {
    const router = useRouter();
    const studentFilters = useAdminStudentsFilters();

    const rolesSelectOption = studentFilters.data?.roles.map((item) => ({
        value: item.name,
        label: item.displayName,
    }));

    const openUserDetailPage = (id: number) => router.push({ pathname: "/admin/students/[id]", query: { id: String(id) } });

    const handlerClickCell = (cell: MRT_Cell<UserFromList>) => {
        openUserDetailPage(cell.row.original.id);
    };

    return (
        <Box {...props}>
            <ManagedDataGrid<UserFromList, AdminStudentsFiltersForm>
                queryKey={QueryKeys.GET_ADMIN_STUDENTS}
                queryFunction={(params) => userApi.getAdminStudents(adaptGetAdminStudentsRequest(params))}
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
                {({ dirty, resetForm, handleSubmit }) => {
                    const handleResetForm = () => {
                        resetForm({ values: filterInitialValues });
                        handleSubmit();
                    };
                    return (
                        <Box>
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
                                    <Button type="button" variant="white" onClick={handleResetForm} w="100%" maw={164}>
                                        Cбросить
                                    </Button>
                                )}
                            </Flex>
                        </Box>
                    );
                }}
            </ManagedDataGrid>
        </Box>
    );
};

export default AdminList;
