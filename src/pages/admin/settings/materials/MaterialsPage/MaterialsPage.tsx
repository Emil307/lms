import { Box, Flex, Text } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { openModal } from "@mantine/modals";
import { Button, Heading } from "@shared/ui";
import { List as MaterialList } from "@features/materials";
import { SelectTypeMaterial } from "@widgets/admin/materials";
import useStyles from "./MaterialsPage.styles";

const MaterialsPage = () => {
    const { classes } = useStyles();

    const openModalCreateMaterial = () => {
        openModal({
            modalId: "CREATE_MATERIAL",
            title: (
                <Flex direction="column" gap={8}>
                    <Heading order={3}>Создать материал</Heading>
                    <Text className={classes.descriptionModal}>Выберите тип отображения контента</Text>
                </Flex>
            ),
            centered: true,
            children: <SelectTypeMaterial />,
            size: 912,
        });
    };

    return (
        <Box>
            <Flex align="center" justify="space-between" mb={24}>
                <Heading>Справочник материалов</Heading>
                <Button variant="secondary" size="large" leftIcon={<PlusCircle />} onClick={openModalCreateMaterial}>
                    Создать материал
                </Button>
            </Flex>
            <MaterialList />
        </Box>
    );
};

export default MaterialsPage;
