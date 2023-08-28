import { PlusCircle } from "react-feather";
import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Button } from "@shared/ui";
import { useMedia } from "@shared/utils";
import { AddArticlesToCourseModal } from "@features/courses";
import useStyles from "./AddCourseArticlesButton.styles";

export interface AddCourseArticlesButtonProps {
    courseId: string;
    hidden?: boolean;
}

const AddCourseArticlesButton = ({ courseId, hidden }: AddCourseArticlesButtonProps) => {
    const { classes } = useStyles();

    const isTablet = useMedia("sm");

    const handleCloseAddCourseArticleModal = () => closeModal("ATTACH_ARTICLES_TO_COURSE");

    const handleOpenAddCourseArticleModal = () => {
        openModal({
            modalId: "ATTACH_ARTICLES_TO_COURSE",
            title: "Привязать статью",
            children: <AddArticlesToCourseModal courseId={courseId} onClose={handleCloseAddCourseArticleModal} />,
            size: 912,
            className: classes.addArticlesToArticlePackageModalWrapper,
        });
    };

    if (hidden) {
        return null;
    }

    if (isTablet) {
        return (
            <ActionIcon className={classes.actionIcon} onClick={handleOpenAddCourseArticleModal}>
                <PlusCircle />
            </ActionIcon>
        );
    }

    return (
        <Button variant="text" leftIcon={<PlusCircle />} onClick={handleOpenAddCourseArticleModal}>
            Добавить привязку
        </Button>
    );
};

export default AddCourseArticlesButton;
