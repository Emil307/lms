import { Box, Flex, ThemeIcon, Title } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { useState } from "react";
import { MRT_SortingState } from "mantine-react-table";
import { useRouter } from "next/router";
import { closeModal, openModal } from "@mantine/modals";
import { DataGrid } from "@shared/ui";
import { Button } from "@shared/ui";
import Pagination from "@shared/ui/DataGrid/Pagination";
import { AdminCategory, useAdminCategories, useAdminCategory } from "@entities/category";
import { columnOrder, columns, getStylesForCell } from "./constant";
import { ListMenu } from "./components";
import { CreateCategoryForm } from "../CreateCategoryForm";

interface TRouterQueries {
    id?: string;
    page?: string;
    perPage?: string;
}

const SubCategoryList = () => {
    const router = useRouter();
    const { page, perPage, id: parentId } = router.query as TRouterQueries;
    const [sorting, setSorting] = useState<MRT_SortingState>([]);

    const handleCloseCreateCategoryModal = () => closeModal("CREATE_SUBCATEGORY");

    const openModalCreateSubCategory = () => {
        openModal({
            modalId: "CREATE_SUBCATEGORY",
            title: "Создание подкатегории",
            centered: true,
            children: <CreateCategoryForm parentId={Number(parentId)} onClose={handleCloseCreateCategoryModal} />,
        });
    };

    const { data: parentData } = useAdminCategory(parentId);

    const { data, isLoading, isRefetching, isFetching } = useAdminCategories({
        sorting,
        perPage: perPage ? Number(perPage) : 10,
        page: page ? Number(page) : 1,
        filter: {
            parentId,
        },
    });

    const totalPage = data?.meta.pagination.total_pages;
    const firstElemIndex = (data?.meta.pagination.per_page ?? 0) * ((data?.meta.pagination.current_page ?? 0) - 1) + 1;
    const lastElemIndex =
        (data?.meta.pagination.per_page ?? 0) * ((data?.meta.pagination.current_page ?? 0) - 1) + (data?.meta.pagination.count ?? 0);

    return (
        <Box mt={24}>
            <DataGrid<AdminCategory>
                getStylesCell={getStylesForCell}
                manualSorting
                onSortingChange={setSorting}
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
                countName="Подкатегорий"
                count={data?.meta.pagination.count}
                total={data?.meta.pagination.total}
                initialState={{
                    columnOrder,
                }}
                enablePinning
                renderRowActions={({ row }) => <ListMenu row={row} />}
                enableColumnFilterModes
                enableRowActions
                enableRowSelection
                renderBottomToolbar={({ table }) => {
                    if (!data?.meta.pagination) {
                        return null;
                    }
                    return <Pagination table={table} firstElemIndex={firstElemIndex} lastElemIndex={lastElemIndex} count={totalPage} />;
                }}>
                <Flex gap={48} align="center">
                    <Title order={2} color="dark">
                        Список подкатегорий
                    </Title>
                    {parentData?.isActive && (
                        <Button
                            variant="text"
                            onClick={openModalCreateSubCategory}
                            leftIcon={
                                <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                                    <PlusCircle />
                                </ThemeIcon>
                            }>
                            Добавить подкатегорию
                        </Button>
                    )}
                </Flex>
            </DataGrid>
        </Box>
    );
};

export default SubCategoryList;
