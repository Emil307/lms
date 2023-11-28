import { Box, BoxProps, Flex } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { AdminSubCategoriesExtraFilters, AdminSubCategoryFromList, categoryApi, useAdminCategory } from "@entities/category";
import { EntityNames, QueryKeys } from "@shared/constant";
import { columnOrder, columns } from "./constant";
import { CreateSubCategoryButton, ListMenu } from "./components";
import { adaptGetAdminSubCategoriesRequest } from "./utils";
import useStyles from "./AdminSubCategoryList.styles";
import { CreateCategoryForm } from "../CreateCategoryForm";

export interface AdminSubCategoryListProps extends BoxProps {
    parentId: string;
}

const AdminSubCategoryList = ({ parentId, ...props }: AdminSubCategoryListProps) => {
    const { classes } = useStyles();

    const handleCloseCreateCategoryModal = () => closeModal("CREATE_SUBCATEGORY");

    const openModalCreateSubCategory = () => {
        openModal({
            modalId: "CREATE_SUBCATEGORY",
            title: "Создание подкатегории",
            children: <CreateCategoryForm parentId={Number(parentId)} isSubcategory onClose={handleCloseCreateCategoryModal} />,
        });
    };

    const { data: categoryData } = useAdminCategory({ id: parentId });

    return (
        <Box {...props}>
            <Flex className={classes.headingContainer}>
                <Heading order={2}>Список подкатегорий</Heading>
                <CreateSubCategoryButton onClick={openModalCreateSubCategory} isActiveCategory={categoryData?.isActive} />
            </Flex>
            <ManagedDataGrid<AdminSubCategoryFromList, unknown, AdminSubCategoriesExtraFilters>
                queryKey={[QueryKeys.GET_ADMIN_SUBCATEGORIES_PAGINATE, [EntityNames.CATEGORY]]}
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
