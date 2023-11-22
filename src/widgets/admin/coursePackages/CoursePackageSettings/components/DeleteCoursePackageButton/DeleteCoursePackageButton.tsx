import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Trash } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { DeleteCoursePackageModal } from "@features/coursePackages";
import { AdminCoursePackageDetails } from "@entities/coursePackage";
import { useMedia } from "@shared/utils";

export interface DeleteCoursePackageButtonProps {
    data?: AdminCoursePackageDetails;
}

const DeleteCoursePackageButton = ({ data }: DeleteCoursePackageButtonProps) => {
    const router = useRouter();

    const isMobile = useMedia("sm");

    const closeDeleteModal = () => {
        closeModal("DELETE_COURSE_PACKAGE");
    };

    const handleSuccessDelete = () => {
        closeDeleteModal();
        router.push("/admin/settings/course-packages");
    };

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_COURSE_PACKAGE",
            title: "Удаление пакета",
            children: (
                <DeleteCoursePackageModal
                    id={String(data?.id)}
                    name={data?.name}
                    onSuccess={handleSuccessDelete}
                    onCancel={closeDeleteModal}
                />
            ),
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
