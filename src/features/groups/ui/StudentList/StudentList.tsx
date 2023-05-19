import { Box, Flex, ThemeIcon, Title } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { ManagedDataGrid } from "@shared/ui";
import { Button } from "@shared/ui";
import { Group, groupApi, GroupsListFilters } from "@entities/group";
import { QueryKeys } from "@shared/constant";
import { columnOrder, columns, filterInitialValues } from "./constant";
import { ListMenu } from "./components";
import { adaptGetAdminGroupsRequest } from "./utils";

const StudentList = () => {
    const router = useRouter();

    const pushOnUserDetail = (id: number) => {
        router.push({ pathname: "/admin/students/[id]", query: { id: String(id) } });
    };

    const handlerClickCell = (cell: MRT_Cell<Group>) => {
        pushOnUserDetail(cell.row.original.id);
    };

    //TODO: Таблица пока не настроена так как что касается учеников на стороне бекенда ничего нет

    return (
        <Box mt={24}>
            <Flex gap={48} align="center">
                <Title order={2} color="dark">
                    Состав группы
                </Title>
                <Button
                    variant="text"
                    leftIcon={
                        <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                            <PlusCircle />
                        </ThemeIcon>
                    }>
                    Добавить ученика
                </Button>
            </Flex>
            {/* //TODO: Поменять эндпоинт на получение учеников в группе, как бекенд будет готов */}
            <ManagedDataGrid<Group, GroupsListFilters>
                queryKey={QueryKeys.GET_ADMIN_GROUPS}
                queryFunction={(params) => groupApi.getAdminGroups(adaptGetAdminGroupsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "isActive", "query"]}
                onClickCell={handlerClickCell}
                renderActiveBadge={(cell) => cell.row.original.isActive}
                columns={columns}
                countName="Ученики"
                initialState={{
                    columnOrder,
                }}
                filter={{ initialValues: filterInitialValues }}
                renderRowActions={({ row }) => <ListMenu row={row} />}
            />
        </Box>
    );
};

export default StudentList;
