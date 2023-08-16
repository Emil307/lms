import { PlusCircle } from "react-feather";
import { useMediaQuery } from "@mantine/hooks";
import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Button } from "@shared/ui";
import { AddMaterialsToArticleModal } from "@features/articles";
import useStyles from "./AddMaterialsToArticleButton.styles";

export interface AddMaterialsToArticleButtonProps {
    articleId: string;
}

const AddMaterialsToArticleButton = ({ articleId }: AddMaterialsToArticleButtonProps) => {
    const { classes } = useStyles();

    const isTablet = useMediaQuery("(max-width: 744px)");

    const handleCloseAddMaterialsToArticleModal = () => closeModal("ADD_MATERIAL_TO_ARTICLE");

    const handleOpenAddMaterialsToArticleModal = () => {
        openModal({
            modalId: "ADD_MATERIAL_TO_ARTICLE",
            title: "Добавить материалы",
            children: <AddMaterialsToArticleModal articleId={articleId} onClose={handleCloseAddMaterialsToArticleModal} />,
            size: 912,
            className: classes.addMaterialsToArticleModalWrapper,
        });
    };
    if (isTablet) {
        return (
            <ActionIcon className={classes.actionIcon} onClick={handleOpenAddMaterialsToArticleModal}>
                <PlusCircle />
            </ActionIcon>
        );
    }

    return (
        <Button variant="text" leftIcon={<PlusCircle />} onClick={handleOpenAddMaterialsToArticleModal}>
            Добавить материалы
        </Button>
    );
};

export default AddMaterialsToArticleButton;