import { Box, BoxProps, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FSearch, ManagedDataGrid } from "@shared/ui";
import { Button } from "@shared/ui";
import { AdminCategoriesFiltersForm, AdminCategoryFromList, categoryApi } from "@entities/category";
import { QueryKeys } from "@shared/constant";
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
                queryKey={QueryKeys.GET_ADMIN_CATEGORIES}
                queryFunction={(params) => categoryApi.getAdminCategories(adaptGetAdminCategoriesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderActiveBadge={(cell) => cell.row.original.isActive}
                onClickCell={handleClickCell}
                columns={columns}
                countName="Категорий"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}>
                <Flex columnGap={16} rowGap={0}>
                    <FSearch w="100%" maw={512} size="sm" name="query" placeholder="Поиск" />
                    <Button type="submit" w="100%" maw={164}>
                        Найти
                    </Button>
                </Flex>
            </ManagedDataGrid>
        </Box>
    );
};

export default AdminList;
