import { Box, BoxProps, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FSearch, ManagedDataGrid, Button } from "@shared/ui";
import { AdminCategoriesFiltersForm, AdminCategoryFromList, categoryApi } from "@entities/category";
import { EntityNames, QueryKeys } from "@shared/constant";
import { columnOrder, columns, filterInitialValues } from "./constant";
import { ListMenu } from "./components";
import { adaptGetAdminCategoriesRequest } from "./utils";

export interface AdminListProps extends BoxProps {}

const AdminList = (props: AdminListProps) => {
    const router = useRouter();

    const handleClickCell = (cell: MRT_Cell<AdminCategoryFromList>) => {
        router.push({ pathname: "/admin/settings/categories/[id]", query: { id: String(cell.row.original.id) } });
    };

    return (
        <Box {...props}>
            <ManagedDataGrid<AdminCategoryFromList, AdminCategoriesFiltersForm>
                queryKey={[QueryKeys.GET_ADMIN_CATEGORIES, [EntityNames.CATEGORY]]}
                queryFunction={(params) => categoryApi.getAdminCategories(adaptGetAdminCategoriesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                onClickCell={handleClickCell}
                columns={columns}
                countName="Категорий"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}>
                {({ dirty, handleReset }) => {
                    return (
                        <Flex direction={{ base: "column", xs: "row" }} gap={16}>
                            <FSearch name="query" placeholder="Поиск" size="sm" w="100%" maw={512} />
                            <Flex gap={16} sx={{ flex: 1 }}>
                                <Button type="submit" w="100%" miw={130} maw={164}>
                                    Найти
                                </Button>
                                {dirty && (
                                    <Button variant="white" w="100%" miw={130} maw={164} onClick={handleReset}>
                                        Сбросить
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
