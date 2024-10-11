import { Box, Flex } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FSearch, FSelect, Heading, Button, ManagedDataGrid } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { UserFromList, UsersFilters } from "@entities/user/api/types";
import { useAdminUsersFilters, userApi } from "@entities/user";
import { EntityNames, QueryKeys } from "@shared/constant";
import { useMedia } from "@shared/utils";
import { columns, filterInitialValues, radioGroupValues } from "./constant";
import { $validationSchema } from "./types/validation";
import { ListMenu } from "./components";
import useStyles from "./List.styles";

const UserList = () => {
    const router = useRouter();
    const { classes } = useStyles();
    const userFilters = useAdminUsersFilters();

    const isTablet = useMedia("md");

    const isMobile = useMedia("sm");

    const rolesSelectOption = userFilters.data?.roles.map((item) => {
        return {
            value: item.name,
            label: item.displayName,
        };
    });

    const handlerClickCell = (cell: MRT_Cell<UserFromList>) => {
        router.push({ pathname: "/admin/users/[id]", query: { id: String(cell.row.original.id) } });
    };

    const pushOnCreateUser = () => {
        router.push("/admin/users/create");
    };

    return (
        <Box>
            <Flex align="center" justify="space-between" gap={16} wrap="wrap">
                <Heading>Пользователи</Heading>
                <Button onClick={pushOnCreateUser} variant="secondary" size={isTablet ? "medium" : "large"} leftIcon={<PlusCircle />}>
                    Создать пользователя
                </Button>
            </Flex>

            <Box mt={24}>
                <ManagedDataGrid<UserFromList, UsersFilters>
                    queryKey={[QueryKeys.GET_ADMIN_USERS, [EntityNames.USER]]}
                    queryFunction={(params) => userApi.getAdminUsers(params)}
                    queryCacheKeys={["page", "perPage", "sort", "roleName", "isActive", "query"]}
                    filter={{
                        initialValues: filterInitialValues,
                        validationSchema: $validationSchema,
                    }}
                    renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                    onClickCell={handlerClickCell}
                    columns={columns}
                    countName="Пользователей"
                    initialState={{
                        columnOrder: ["id", "fullName", "roleName", "email", "isActive", "mrt-row-actions"],
                    }}
                    renderRowActions={({ row }) => <ListMenu row={row} />}
                    collapsedFiltersBlockProps={{
                        isCollapsed: isMobile,
                    }}>
                    {({ dirty, handleReset }) => {
                        return (
                            <Flex className={classes.filterWrapper}>
                                <Flex className={classes.filterSearchAndRoleSelectContainer}>
                                    <FSearch  name="query" placeholder="Поиск" className={classes.filterSearch} />
                                    <FSelect
                                        name="roleName"
                                        size="sm"
                                        data={rolesSelectOption ?? []}
                                        clearable
                                        label="Роль"
                                        disabled={userFilters.isLoading}
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
        </Box>
    );
};

export default UserList;
