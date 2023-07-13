import { Flex } from "@mantine/core";
import React from "react";
import { closeAllModals, closeModal, openModal } from "@mantine/modals";
import { CreateMaterialsForm, UpdateMaterialsForm, MATERIALS_LOCAL_STORAGE_KEY } from "@features/materials";
import { UploadedFile } from "@shared/types";
import { fileTypeCards } from "./constants";
import { MaterialTypeCard } from "./components";
import FoldersIcon from "public/icons/folders.svg";

interface SelectTypeMaterialProps {
    onSelectFromBase?: () => void;
    onSuccessLoadFiles?: (fileIds: string[]) => void;
}

const SelectTypeMaterial = ({ onSuccessLoadFiles, onSelectFromBase }: SelectTypeMaterialProps) => {
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
            centered: true,
            size: 456,
            children: (
                <UpdateMaterialsForm
                    data={materials}
                    type={type}
                    onSubmit={handleSubmitEditMaterialsFormModal}
                    onClose={handleCloseEditMaterialsFormModal}
                />
            ),
        });
    };

    const handleSelectCard = (id: number) => {
        handleClearStorage();
        openModal({
            modalId: "CREATE_MATERIALS",
            title: `Шаг 1/2. ${fileTypeCards[id].title}`,
            centered: true,
            children: (
                <CreateMaterialsForm
                    data={fileTypeCards[id]}
                    onSubmit={handleSubmitCreateMaterials}
                    onClose={handleCloseCreateMaterialsModal}
                />
            ),
            size: 456,
            onClose: handleClearStorage,
        });
    };

    return (
        <Flex gap={24}>
            {onSelectFromBase && <MaterialTypeCard title="Выбрать из базы" icon={<FoldersIcon />} onClick={onSelectFromBase} />}
            {fileTypeCards.map((card) => (
                <MaterialTypeCard key={card.id} title={card.title} icon={card.icon} onClick={() => handleSelectCard(card.id)} />
            ))}
        </Flex>
    );
};

export default SelectTypeMaterial;
