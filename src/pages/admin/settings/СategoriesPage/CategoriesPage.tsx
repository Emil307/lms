import { Box, Flex, Title } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { Button } from "@shared/ui";
import { CategoryList, CreateCategoryForm } from "@features/categories";

const CategoriesPage = () => {
    const handleCloseCreateCategoryModal = () => closeModal("CREATE_CATEGORY");

    const openModalCreateCategory = () => {
        openModal({
            modalId: "CREATE_CATEGORY",
            title: "Создание категории",
            centered: true,
            children: <CreateCategoryForm onClose={handleCloseCreateCategoryModal} />,
        });
    };

    return (
        <Box>
            <Flex align="center" justify="space-between">
                <Title order={1} color="dark">
                    Категории курсов
                </Title>
                <Button variant="secondary" size="large" leftIcon={<PlusCircle />} onClick={openModalCreateCategory}>
                    Создать категорию
                </Button>
            </Flex>
            <CategoryList />
        </Box>
    );
};

export default CategoriesPage;
