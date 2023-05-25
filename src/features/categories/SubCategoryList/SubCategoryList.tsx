import { Box, Flex, ThemeIcon, Title } from "@mantine/core";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { closeModal, openModal } from "@mantine/modals";
import { ManagedDataGrid } from "@shared/ui";
import { Button } from "@shared/ui";
import { AdminCategory, categoryApi, SubCategoriesFilters, useAdminCategory } from "@entities/category";
import { QueryKeys } from "@shared/constant";
import { TRouterQueries } from "@shared/types";
import { columnOrder, columns } from "./constant";
import { ListMenu } from "./components";
import { adaptGetAdminSubCategoriesRequest } from "./utils";
import { CreateCategoryForm } from "../CreateCategoryForm";

const SubCategoryList = () => {
    const router = useRouter();
    const { id: parentId } = router.query as TRouterQueries;

    const handleCloseCreateCategoryModal = () => closeModal("CREATE_SUBCATEGORY");

    const openModalCreateSubCategory = () => {
        openModal({
            modalId: "CREATE_SUBCATEGORY",
            title: "Создание подкатегории",
            centered: true,
            children: <CreateCategoryForm parentId={Number(parentId)} isActive onClose={handleCloseCreateCategoryModal} />,
        });
    };

    const { data: parentData } = useAdminCategory(parentId);

    return (
        <Box mt={24}>
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
            <ManagedDataGrid<AdminCategory, unknown, SubCategoriesFilters>
                queryKey={QueryKeys.GET_ADMIN_SUBCATEGORIES}
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

export default SubCategoryList;
