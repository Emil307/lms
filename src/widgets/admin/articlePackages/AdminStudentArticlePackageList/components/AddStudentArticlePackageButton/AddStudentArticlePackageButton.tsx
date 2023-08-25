import { PlusCircle } from "react-feather";
import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Button } from "@shared/ui";
import { useMedia } from "@shared/utils";
import { AddArticlePackagesToStudentModal } from "@features/articlePackages";
import useStyles from "./AddStudentArticlePackageButton.styles";

export interface AddStudentArticlePackageButtonProps {
    studentId: string;
}

const AddStudentArticlePackageButton = ({ studentId }: AddStudentArticlePackageButtonProps) => {
    const { classes } = useStyles();

    const isTablet = useMedia("sm");

    const handleCloseAddArticlePackagesToStudentModal = () => closeModal("ATTACH_ARTICLE_PACKAGES_TO_STUDENT");

    const openAddArticlePackagesToStudentModal = () => {
        openModal({
            modalId: "ATTACH_ARTICLE_PACKAGES_TO_STUDENT",
            title: "Добавить пакет",
            children: <AddArticlePackagesToStudentModal studentId={studentId} onClose={handleCloseAddArticlePackagesToStudentModal} />,
            size: 912,
            className: classes.addArticlePackagesToStudentModalWrapper,
        });
    };

    if (isTablet) {
        return (
            <ActionIcon className={classes.actionIcon} onClick={openAddArticlePackagesToStudentModal}>
                <PlusCircle />
            </ActionIcon>
        );
    }

    return (
        <Button variant="text" leftIcon={<PlusCircle />} onClick={openAddArticlePackagesToStudentModal}>
            Добавить пакет
        </Button>
    );
};

export default AddStudentArticlePackageButton;
