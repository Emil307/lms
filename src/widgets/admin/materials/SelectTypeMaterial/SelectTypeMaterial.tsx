import { Flex, Box } from "@mantine/core";
import React from "react";
import { closeAllModals, closeModal, openModal } from "@mantine/modals";
import { CreateMaterialsForm, UpdateMaterialsForm, MATERIALS_LOCAL_STORAGE_KEY, IMaterialTypeCard } from "@features/materials";
import FoldersIcon from "public/icons/folders.svg";
import { Paragraph } from "@shared/ui";
import { materialTypeCards } from "./constants";
import { MaterialTypeCard } from "./components";
import useStyles from "./SelectTypeMaterial.styles";

interface SelectTypeMaterialProps {
    description: string;
    onSelectFromBase?: () => void;
    onSuccessLoadFiles?: (fileIds: string[]) => void;
}

const SelectTypeMaterial = ({ description, onSuccessLoadFiles, onSelectFromBase }: SelectTypeMaterialProps) => {
    const { classes } = useStyles({ selectFromBase: !!onSelectFromBase });

    const handleCloseCreateMaterialsModal = () => {
        closeModal("CREATE_MATERIALS");
        handleClearStorage();
    };
    const handleClearStorage = () => sessionStorage.removeItem(MATERIALS_LOCAL_STORAGE_KEY);

    const handleCloseEditMaterialsFormModal = () => {
        closeModal("EDIT_MATERIALS");
    };

    const handleSubmitEditMaterialsFormModal = (fileIds: string[]) => {
        onSuccessLoadFiles && onSuccessLoadFiles(fileIds);
        closeAllModals();
        handleClearStorage();
    };

    const handleSubmitCreateMaterials = (type: "video" | "document") => {
        openModal({
            modalId: "EDIT_MATERIALS",
            title: "Шаг 2/2. Редактирование",
            children: (
                <UpdateMaterialsForm
                    type={type}
                    onSubmit={handleSubmitEditMaterialsFormModal}
                    onClose={handleCloseEditMaterialsFormModal}
                    multiple
                />
            ),
        });
    };

    const handleSelectCard = (card: IMaterialTypeCard) => {
        handleClearStorage();
        openModal({
            modalId: "CREATE_MATERIALS",
            title: `Шаг 1/2. ${card.title}`,
            children: <CreateMaterialsForm data={card} onSubmit={handleSubmitCreateMaterials} onClose={handleCloseCreateMaterialsModal} />,
            onClose: handleClearStorage,
        });
    };

    return (
        <Box>
            <Paragraph className={classes.description} variant="small-m" color="neutral_gray">
                {description}
            </Paragraph>
            <Flex className={classes.content}>
                {onSelectFromBase && <MaterialTypeCard title="Выбрать из базы" icon={<FoldersIcon />} onClick={onSelectFromBase} />}
                {materialTypeCards.map((card) => (
                    <MaterialTypeCard key={card.id} title={card.title} icon={card.icon} onClick={() => handleSelectCard(card)} />
                ))}
            </Flex>
        </Box>
    );
};

export default SelectTypeMaterial;
