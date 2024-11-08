import { PlusCircle } from "react-feather";
import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Button } from "@shared/ui";
import { AddCoursesToArticleModal } from "@features/articles";
import { useMedia } from "@shared/utils";
import useStyles from "./AddArticleCourseButton.styles";

export interface AddArticleCourseButtonProps {
    articleId: string;
    hidden?: boolean;
}

const AddArticleCourseButton = ({ articleId, hidden }: AddArticleCourseButtonProps) => {
    const { classes } = useStyles();

    const isTablet = useMedia("sm");

    const handleCloseAddArticleCoursesModal = () => closeModal("ATTACH_COURSES_TO_ARTICLE");

    const handleOpenAddArticleCoursesModal = () => {
        openModal({
            modalId: "ATTACH_COURSES_TO_ARTICLE",
            title: "Привязать к курсу",
            children: <AddCoursesToArticleModal articleId={articleId} onClose={handleCloseAddArticleCoursesModal} />,
            size: 912,
            styles: () => ({ modal: { height: 860 } }),
        });
    };

    if (hidden) {
        return null;
    }

    if (isTablet) {
        return (
            <ActionIcon className={classes.actionIcon} onClick={handleOpenAddArticleCoursesModal}>
                <PlusCircle />
            </ActionIcon>
        );
    }

    return (
        <Button variant="text" leftIcon={<PlusCircle />} onClick={handleOpenAddArticleCoursesModal}>
            Добавить привязку
        </Button>
    );
};

export default AddArticleCourseButton;
