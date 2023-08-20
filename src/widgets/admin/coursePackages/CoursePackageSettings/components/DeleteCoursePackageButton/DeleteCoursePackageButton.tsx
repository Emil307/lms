import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Trash } from "react-feather";
import { Button } from "@shared/ui";
import { DeleteCoursePackageModal } from "@features/coursePackages";
import { AdminCoursePackageDetails } from "@entities/coursePackage";
import { useMedia } from "@shared/utils";

export interface DeleteCoursePackageButtonProps {
    data?: AdminCoursePackageDetails;
}

const DeleteCoursePackageButton = ({ data }: DeleteCoursePackageButtonProps) => {
    const isMobile = useMedia("sm");

    const handleCloseDeleteModal = () => closeModal("DELETE_COURSE_PACKAGE");

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_COURSE_PACKAGE",
            title: "Удаление пакета",
            children: <DeleteCoursePackageModal id={String(data?.id)} name={data?.name} onClose={handleCloseDeleteModal} />,
        });
    };

    if (isMobile) {
        return (
            <ActionIcon color="dark" onClick={openDeleteModal}>
                <Trash />
            </ActionIcon>
        );
    }

    return (
        <Button onClick={openDeleteModal} variant="text" leftIcon={<Trash />}>
            Удалить пакет
        </Button>
    );
};

export default DeleteCoursePackageButton;
