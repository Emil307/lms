import { Box, BoxProps, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FSearch, ManagedDataGrid, Button } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { AdminStudentsFiltersForm, UserFromList } from "@entities/user/api/types";
import { userApi } from "@entities/user";
import { EntityNames, QueryKeys } from "@shared/constant";
import { useMedia } from "@shared/utils";
import { useUserRole } from "@entities/auth";
import { Roles } from "@app/routes";
import { ListMenu } from "./components";
import { radioGroupValues } from "./constants";
import { useStudentListData } from "./utils";
import useStyles from "./AdminList.styles";

export interface AdminListProps extends BoxProps {}

const AdminList = (props: AdminListProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const isMobile = useMedia("sm");

    const userRole = useUserRole();

    const { columns, columnOrder, filterInitialValues, adaptGetAdminStudentsRequest, renderBadge } = useStudentListData(userRole);

    const openUserDetailPage = (id: number) => router.push({ pathname: "/admin/students/[id]", query: { id: String(id) } });

    const handlerClickCell = (cell: MRT_Cell<UserFromList>) => {
        openUserDetailPage(cell.row.original.id);
    };

    return (
        <Box {...props}>
            <ManagedDataGrid<UserFromList, Partial<AdminStudentsFiltersForm>>
                queryKey={[QueryKeys.GET_ADMIN_STUDENTS, [EntityNames.STUDENT]]}
                queryFunction={(params) => userApi.getAdminStudents(adaptGetAdminStudentsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "isActive", "query"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderBadge={renderBadge()}
                onClickCell={handlerClickCell}
                columns={columns}
                accessRole={userRole}
                countName="Учеников"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}
                collapsedFiltersBlockProps={{
                    isCollapsed: isMobile,
                }}>
                {({ dirty, handleReset }) => {
                    return (
                        <Flex className={classes.filterWrapper}>
                            <Flex className={classes.filterSearchAndSelects}>
                                <FSearch size="sm" name="query" placeholder="Поиск" className={classes.filterSearch} />
                            </Flex>

                            {userRole !== Roles.teacher && (
                                <FRadioGroup name="isActive" defaultValue="" className={classes.filterRadioGroup}>
                                    {radioGroupValues.map((item) => (
                                        <Radio size="md" key={item.id} label={item.label} value={item.value} />
                                    ))}
                                </FRadioGroup>
                            )}

                            <Flex gap={16}>
                                <Button w={164} type="submit">
                                    Найти
                                </Button>
                                {dirty && (
                                    <Button type="button" variant="border" onClick={handleReset} w={164}>
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
