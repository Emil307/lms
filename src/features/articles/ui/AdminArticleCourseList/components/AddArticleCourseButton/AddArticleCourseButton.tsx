import { PlusCircle } from "react-feather";
import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Button } from "@shared/ui";
import { AddCoursesToArticleModal } from "@features/articles";
import useStyles from "./AddArticleCourseButton.styles";
import { useMedia } from "@shared/utils";

export interface AddArticleCourseButtonProps {
    articleId: string;
}

const AddArticleCourseButton = ({ articleId }: AddArticleCourseButtonProps) => {
    const { classes } = useStyles();

    const isTablet = useMedia("sm");

    const handleCloseAddArticleCoursesModal = () => closeModal("ATTACH_COURSES_TO_ARTICLE");

    const handleOpenAddArticleCoursesModal = () => {
        openModal({
            modalId: "ATTACH_COURSES_TO_ARTICLE",
            title: "Привязать к курсу",
            children: <AddCoursesToArticleModal articleId={articleId} onClose={handleCloseAddArticleCoursesModal} />,
            size: 912,
            className: classes.addArticleCoursesModalWrapper,
        });
    };
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
