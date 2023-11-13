import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { openModal } from "@mantine/modals";
import { Button, Heading } from "@shared/ui";
import { AdminList as AdminMaterialList } from "@features/materials";
import { SelectTypeMaterial } from "@widgets/admin/materials";
import { useMedia } from "@shared/utils";
import useStyles from "./MaterialsPage.styles";

const MaterialsPage = () => {
    const { classes } = useStyles();

    const isTablet = useMedia("md");

    const openModalCreateMaterial = () => {
        openModal({
            modalId: "CREATE_MATERIAL",
            title: "Создать материал",
            children: <SelectTypeMaterial description="Выберите тип отображения контента" />,
            size: 912,
        });
    };

    return (
        <Box>
            <Flex className={classes.headingContainer}>
                <Heading>Справочник материалов</Heading>
                <Button
                    variant="secondary"
                    size={isTablet ? "medium" : "large"}
                    leftIcon={<PlusCircle />}
                    onClick={openModalCreateMaterial}>
                    Создать материал
                </Button>
            </Flex>
            <AdminMaterialList />
        </Box>
    );
};

export default MaterialsPage;
