import { PlusCircle } from "react-feather";
import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Button } from "@shared/ui";
import { AddArticleToArticlePackageModal } from "@features/articlePackages";
import useStyles from "./AddArticlesToArticlePackageButton.styles";
import { useMedia } from "@shared/utils";

export interface AddArticlesToArticlePackageButtonProps {
    articlePackageId: string;
}

const AddArticlesToArticlePackageButton = ({ articlePackageId }: AddArticlesToArticlePackageButtonProps) => {
    const { classes } = useStyles();

    const isTablet = useMedia("sm");

    const handleCloseAddArticleToPackageModal = () => closeModal("ADD_ARTICLE_TO_ARTICLE_PACKAGE");

    const openAddArticleToPackageModal = () => {
        openModal({
            modalId: "ADD_ARTICLE_TO_ARTICLE_PACKAGE",
            title: "Добавить статью",
            children: <AddArticleToArticlePackageModal articlePackageId={articlePackageId} onClose={handleCloseAddArticleToPackageModal} />,
            size: 912,
            mah: 912,
            className: classes.addArticlesToArticlePackageModalWrapper,
        });
    };

    if (isTablet) {
        return (
            <ActionIcon className={classes.actionIcon} onClick={openAddArticleToPackageModal}>
                <PlusCircle />
            </ActionIcon>
        );
    }

    return (
        <Button variant="text" leftIcon={<PlusCircle />} onClick={openAddArticleToPackageModal}>
            Добавить статью
        </Button>
    );
};

export default AddArticlesToArticlePackageButton;
