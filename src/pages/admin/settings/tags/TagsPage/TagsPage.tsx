import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useMediaQuery } from "@mantine/hooks";
import { Button, Heading } from "@shared/ui";
import { CreateTagForm, AdminList as AdminTagList } from "@features/tags";
import useStyles from "./TagsPage.styles";

const TagsPage = () => {
    const { classes } = useStyles();
    const isTablet = useMediaQuery("(max-width: 1024px)");

    const handleCloseCreateTagModal = () => closeModal("CREATE_TAG");

    const openModalCreateTag = () => {
        openModal({
            modalId: "CREATE_TAG",
            title: "Создание тега",
            children: <CreateTagForm onClose={handleCloseCreateTagModal} />,
        });
    };

    return (
        <Box>
            <Flex className={classes.headingContainer}>
                <Heading>Теги</Heading>
                <Button variant="secondary" size={isTablet ? "medium" : "large"} leftIcon={<PlusCircle />} onClick={openModalCreateTag}>
                    Создать тег
                </Button>
            </Flex>
            <AdminTagList />
        </Box>
    );
};

export default TagsPage;
