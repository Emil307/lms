import { Trash2 } from "react-feather";
import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Button } from "@shared/ui";
import { GetCoursesResponse } from "@entities/course";
import { useMedia } from "@shared/utils";
import { CleanFavoriteCoursesModal } from "@features/courses";
import useStyles from "./DeleteFavoriteCoursesButton.styles";

export interface DeleteFavoriteCoursesButtonProps {
    data?: GetCoursesResponse;
}

const DeleteFavoriteCoursesButton = ({ data }: DeleteFavoriteCoursesButtonProps) => {
    const { classes } = useStyles();

    const isTablet = useMedia("sm");

    const handleCloseCleanFavoriteCoursesModal = () => closeModal("CLEAN_FAVORITE_COURSES");

    const handleOpenCleanFavoriteCoursesModal = () => {
        openModal({
            modalId: "CLEAN_FAVORITE_COURSES",
            title: "Предупреждение",
            children: <CleanFavoriteCoursesModal onClose={handleCloseCleanFavoriteCoursesModal} />,
        });
    };

    if (!data?.data.length) {
        return null;
    }

    if (isTablet) {
        return (
            <ActionIcon className={classes.actionIcon} onClick={handleOpenCleanFavoriteCoursesModal}>
                <Trash2 />
            </ActionIcon>
        );
    }

    return (
        <Button variant="border" leftIcon={<Trash2 />} onClick={handleOpenCleanFavoriteCoursesModal}>
            Очистить
        </Button>
    );
};

export default DeleteFavoriteCoursesButton;
