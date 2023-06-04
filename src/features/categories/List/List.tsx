import { Box, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FSearch, ManagedDataGrid } from "@shared/ui";
import { Button } from "@shared/ui";
import { AdminCategory, CategoriesFilters, categoryApi } from "@entities/category";
import { QueryKeys } from "@shared/constant";
import { columnOrder, columns, filterInitialValues } from "./constant";
import { ListMenu } from "./components";

const List = () => {
    const router = useRouter();

    const openCategoryDetail = (id: number) => {
        router.push({ pathname: "/admin/settings/categories/[id]", query: { id: String(id) } });
    };

    const handlerClickCell = (cell: MRT_Cell<AdminCategory>) => {
        openCategoryDetail(cell.row.original.id);
    };

    return (
        <Box mt={24}>
            <ManagedDataGrid<AdminCategory, CategoriesFilters>
                queryKey={QueryKeys.GET_ADMIN_CATEGORIES}
                queryFunction={(params) => categoryApi.getAdminCategories(params)}
                queryCacheKeys={["page", "perPage", "sort", "query"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderActiveBadge={(cell) => cell.row.original.isActive}
                onClickCell={handlerClickCell}
                columns={columns}
                countName="Категорий"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}>
                {({ dirty }) => (
                    <Flex columnGap={16} rowGap={0}>
                        <FSearch w="100%" maw={512} size="sm" name="query" placeholder="Поиск" />
                        <Button type="submit" disabled={!dirty} w="100%" maw={164}>
                            Найти
                        </Button>
                    </Flex>
                )}
            </ManagedDataGrid>
        </Box>
    );
};

export default List;
