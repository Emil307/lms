import { Flex } from "@mantine/core";
import React, { useMemo } from "react";
import { closeAllModals, closeModal, openModal } from "@mantine/modals";
import { CreateMaterialsForm, EditMaterialsForm, MATERIALS_LOCAL_STORAGE_KEY } from "@features/materials";
import { UploadedFile } from "@shared/types";
import { fileTypeCards } from "./constants";
import { MaterialTypeCard } from "./components";

const SelectTypeMaterial = () => {
    const handleCloseCreateMaterialsModal = () => {
        closeModal("CREATE_MATERIALS");
        handleClearStorage();
    };
    const handleClearStorage = () => sessionStorage.removeItem(MATERIALS_LOCAL_STORAGE_KEY);

    const handleCloseEditMaterialsFormModal = () => closeModal("EDIT_MATERIALS");
    const handleSubmitEditMaterialsFormModal = () => {
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
                <EditMaterialsForm
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

    const renderCards = useMemo(
        () => fileTypeCards.map((card) => <MaterialTypeCard key={card.id} data={card} onClick={handleSelectCard} />),
        []
    );

    return <Flex gap={24}>{renderCards}</Flex>;
};

export default SelectTypeMaterial;
