import { Flex } from "@mantine/core";
import React from "react";
import { closeAllModals, closeModal, openModal } from "@mantine/modals";
import { CreateMaterialsForm, UpdateMaterialsForm, MATERIALS_LOCAL_STORAGE_KEY } from "@features/materials";
import { UploadedFile } from "@shared/types";
import FoldersIcon from "public/icons/folders.svg";
import { fileTypeCards } from "./constants";
import { MaterialTypeCard } from "./components";
import useStyles from "./SelectTypeMaterial.styles";

interface SelectTypeMaterialProps {
    onSelectFromBase?: () => void;
    onSuccessLoadFiles?: (fileIds: string[]) => void;
}

const SelectTypeMaterial = ({ onSuccessLoadFiles, onSelectFromBase }: SelectTypeMaterialProps) => {
    const { classes } = useStyles();

    const handleCloseCreateMaterialsModal = () => {
        closeModal("CREATE_MATERIALS");
        handleClearStorage();
    };
    const handleClearStorage = () => sessionStorage.removeItem(MATERIALS_LOCAL_STORAGE_KEY);

    const handleCloseEditMaterialsFormModal = () => closeModal("EDIT_MATERIALS");
    const handleSubmitEditMaterialsFormModal = (fileIds: string[]) => {
        onSuccessLoadFiles && onSuccessLoadFiles(fileIds);
        closeAllModals();
        handleClearStorage();
    };

    const handleSubmitCreateMaterials = (materials: UploadedFile[], type: "video" | "document") => {
        openModal({
            modalId: "EDIT_MATERIALS",
            title: "Шаг 2/2. Редактирование",
            children: (
                <UpdateMaterialsForm
                    data={materials}
                    type={type}
                    onSubmit={handleSubmitEditMaterialsFormModal}
                    onClose={handleCloseEditMaterialsFormModal}
                    multiple
                />
            ),
        });
    };

    const handleSelectCard = (id: number) => {
        handleClearStorage();
        openModal({
            modalId: "CREATE_MATERIALS",
            title: `Шаг 1/2. ${fileTypeCards[id].title}`,
            children: (
                <CreateMaterialsForm
                    data={fileTypeCards[id]}
                    onSubmit={handleSubmitCreateMaterials}
                    onClose={handleCloseCreateMaterialsModal}
                />
            ),
            onClose: handleClearStorage,
        });
    };

    return (
        <Flex className={classes.root}>
            {onSelectFromBase && <MaterialTypeCard title="Выбрать из базы" icon={<FoldersIcon />} onClick={onSelectFromBase} />}
            {fileTypeCards.map((card) => (
                <MaterialTypeCard key={card.id} title={card.title} icon={card.icon} onClick={() => handleSelectCard(card.id)} />
            ))}
        </Flex>
    );
};

export default SelectTypeMaterial;
