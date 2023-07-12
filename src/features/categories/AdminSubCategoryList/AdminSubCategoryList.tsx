import { Box, Flex } from "@mantine/core";
import { PlusCircle } from "react-feather";

import { closeModal, openModal } from "@mantine/modals";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { Button } from "@shared/ui";
import { AdminSubCategoriesExtraFilters, AdminSubCategoryFromList, categoryApi, useAdminCategory } from "@entities/category";
import { QueryKeys } from "@shared/constant";
import { columnOrder, columns } from "./constant";
import { ListMenu } from "./components";
import { adaptGetAdminSubCategoriesRequest } from "./utils";
import { CreateCategoryForm } from "../CreateCategoryForm";

export interface AdminSubCategoryListProps {
    parentId: string;
}

const AdminSubCategoryList = ({ parentId }: AdminSubCategoryListProps) => {
    const handleCloseCreateCategoryModal = () => closeModal("CREATE_SUBCATEGORY");

    const openModalCreateSubCategory = () => {
        openModal({
            modalId: "CREATE_SUBCATEGORY",
            title: "Создание подкатегории",
            centered: true,
            children: <CreateCategoryForm parentId={Number(parentId)} isSubcategory onClose={handleCloseCreateCategoryModal} />,
        });
    };

    const { data: categoryData } = useAdminCategory({ id: parentId });

    return (
        <Box mt={24}>
            <Flex gap={48} align="center">
                <Heading order={2}>Список подкатегорий</Heading>
                {categoryData?.isActive && (
                    <Button variant="text" onClick={openModalCreateSubCategory} leftIcon={<PlusCircle />}>
                        Добавить подкатегорию
                    </Button>
                )}
            </Flex>
            <ManagedDataGrid<AdminSubCategoryFromList, unknown, AdminSubCategoriesExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_SUBCATEGORIES_PAGINATE}
                queryFunction={(params) => categoryApi.getAdminPaginateSubCategories(adaptGetAdminSubCategoriesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "parentId"]}
                columns={columns}
                countName="Подкатегорий"
                initialState={{
                    columnOrder,
                }}
                extraFilterParams={{ parentId }}
                renderRowActions={({ row }) => <ListMenu row={row} />}
            />
        </Box>
    );
};

export default AdminSubCategoryList;
