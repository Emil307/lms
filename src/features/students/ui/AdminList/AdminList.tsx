import { Box, BoxProps, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { AdminStudentsFiltersForm, UserFromList } from "@entities/user/api/types";
import { useAdminStudentsFilters, userApi } from "@entities/user";
import { QueryKeys } from "@shared/constant";
import { ListMenu } from "./components";
import { columns, radioGroupValues, filterInitialValues } from "./constants";
import { adaptGetAdminStudentsRequest } from "./utils";
import useStyles from "./AdminList.styles";
import { useMedia } from "@shared/utils";

export interface AdminListProps extends BoxProps {}

const AdminList = (props: AdminListProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const isMobile = useMedia("sm");

    const studentFilters = useAdminStudentsFilters();

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
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                onClickCell={handlerClickCell}
                columns={columns}
                countName="Учеников"
                initialState={{
                    columnOrder: ["id", "fullName", "roleName", "email", "isActive", "mrt-row-actions"],
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}
                collapsedFiltersBlockProps={{
                    isCollapsed: isMobile,
                }}>
                {({ dirty, resetForm, handleSubmit }) => {
                    const handleResetForm = () => {
                        resetForm({ values: filterInitialValues });
                        handleSubmit();
                    };

                    return (
                        <Flex className={classes.filterWrapper}>
                            <Flex className={classes.filterSearchAndSelects}>
                                <FSearch size="sm" name="query" placeholder="Поиск" className={classes.filterSearch} />
                                <FSelect
                                    name="roleName"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: studentFilters.data?.roles,
                                        value: "name",
                                        label: "displayName",
                                    })}
                                    clearable
                                    label="Роль"
                                    className={classes.filterSelect}
                                    disabled={studentFilters.isLoading || !studentFilters.data?.roles.length}
                                />
                            </Flex>
                            <FRadioGroup name="isActive" defaultValue="" className={classes.filterRadioGroup}>
                                {radioGroupValues.map((item) => (
                                    <Radio size="md" key={item.id} label={item.label} value={item.value} />
                                ))}
                            </FRadioGroup>
                            <Flex gap={16}>
                                <Button w={164} type="submit">
                                    Найти
                                </Button>
                                {dirty && (
                                    <Button type="button" variant="white" onClick={handleResetForm} w={164}>
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
