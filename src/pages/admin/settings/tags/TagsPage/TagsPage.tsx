import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { Button, Heading } from "@shared/ui";
import { CreateTagForm, List as TagList } from "@features/tags";

const TagsPage = () => {
    const handleCloseCreateTagModal = () => closeModal("CREATE_TAG");

    const openModalDeleteTag = () => {
        openModal({
            modalId: "CREATE_TAG",
            title: "Создание тега",
            centered: true,
            children: <CreateTagForm onClose={handleCloseCreateTagModal} />,
        });
    };

    return (
        <Box>
            <Flex align="center" justify="space-between">
                <Heading>Теги</Heading>
                <Button variant="secondary" size="large" leftIcon={<PlusCircle />} onClick={openModalDeleteTag}>
                    Создать тег
                </Button>
            </Flex>
            <TagList />
        </Box>
    );
};

export default TagsPage;
