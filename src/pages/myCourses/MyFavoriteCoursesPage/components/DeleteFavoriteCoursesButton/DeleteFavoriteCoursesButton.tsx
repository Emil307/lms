import { Trash2 } from "react-feather";
import { ActionIcon } from "@mantine/core";
import { Button } from "@shared/ui";
import { GetCoursesResponse, useDeleteFavoriteCourses } from "@entities/course";
import useStyles from "./DeleteFavoriteCoursesButton.styles";
import { useMedia } from "@shared/utils";

export interface DeleteFavoriteCoursesButtonProps {
    data?: GetCoursesResponse;
}

const DeleteFavoriteCoursesButton = ({ data }: DeleteFavoriteCoursesButtonProps) => {
    const { classes } = useStyles();

    const isTablet = useMedia("sm");

    const deleteFavoriteCourses = useDeleteFavoriteCourses();

    const handleDeleteFavoriteCourses = () => {
        deleteFavoriteCourses.mutate(null);
    };

    if (!data?.data.length) {
        return null;
    }

    if (isTablet) {
        return (
            <ActionIcon className={classes.actionIcon} onClick={handleDeleteFavoriteCourses}>
                <Trash2 />
            </ActionIcon>
        );
    }

    return (
        <Button variant="border" leftIcon={<Trash2 />} onClick={handleDeleteFavoriteCourses}>
            Очистить
        </Button>
    );
};

export default DeleteFavoriteCoursesButton;
