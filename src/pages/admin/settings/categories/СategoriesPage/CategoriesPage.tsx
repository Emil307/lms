import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { Button, Heading } from "@shared/ui";
import { AdminList as AdminCategoryList, CreateCategoryForm } from "@features/categories";
import { useMedia } from "@shared/utils";
import useStyles from "./CategoriesPage.styles";

const CategoriesPage = () => {
    const { classes } = useStyles();
    const isTablet = useMedia("md");

    const handleCloseCreateCategoryModal = () => closeModal("CREATE_CATEGORY");

    const openModalCreateCategory = () => {
        openModal({
            modalId: "CREATE_CATEGORY",
            title: "Создание категории",
            children: <CreateCategoryForm onClose={handleCloseCreateCategoryModal} />,
        });
    };

    return (
        <Box>
            <Flex className={classes.headingContainer}>
                <Heading>Категории</Heading>
                <Button
                    variant="secondary"
                    size={isTablet ? "medium" : "large"}
                    leftIcon={<PlusCircle />}
                    onClick={openModalCreateCategory}>
                    Создать категорию
                </Button>
            </Flex>
            <AdminCategoryList mt={24} />
        </Box>
    );
};

export default CategoriesPage;
