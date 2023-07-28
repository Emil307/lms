import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { openModal } from "@mantine/modals";
import { useMediaQuery } from "@mantine/hooks";
import { Button, Heading, Paragraph } from "@shared/ui";
import { AdminList as AdminMaterialList } from "@features/materials";
import { SelectTypeMaterial } from "@widgets/admin/materials";
import useStyles from "./MaterialsPage.styles";

const MaterialsPage = () => {
    const { classes } = useStyles();

    const isTablet = useMediaQuery("(max-width: 1024px)");

    const openModalCreateMaterial = () => {
        openModal({
            modalId: "CREATE_MATERIAL",
            title: (
                <Flex direction="column" gap={{ base: 32, xs: 8 }}>
                    <Heading order={3}>Создать материал</Heading>
                    <Paragraph variant="small-m" color="gray45">
                        Выберите тип отображения контента
                    </Paragraph>
                </Flex>
            ),
            children: <SelectTypeMaterial />,
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
