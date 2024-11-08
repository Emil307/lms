import { ActionIcon, BoxProps } from "@mantine/core";
import Heart from "public/icons/icon24px/rating/heart_1.svg";
import { Button } from "@shared/ui";
import { CourseDetails, CourseFromList, useUpdateCourseFavoriteStatus } from "@entities/course";
import { useSession } from "@entities/auth/hooks";
import useStyles from "./FavoriteButton.styles";

export interface FavoriteButtonProps extends Omit<BoxProps, "children"> {
    data: CourseDetails | CourseFromList;
    variant?: "compact" | "default";
    className?: string;
}

const FavoriteButton = ({ data, variant = "default", ...props }: FavoriteButtonProps) => {
    const { classes, cx } = useStyles({ isFavorite: data.isFavorite });
    const { user } = useSession();

    const updateFavorite = useUpdateCourseFavoriteStatus({ id: String(data.id), name: data.name, absolutePath: data.cover?.absolutePath });

    const handleChangeFavorite = () => {
        event?.preventDefault();
        updateFavorite.mutate({ isFavorite: !data.isFavorite });
    };

    if (!user?.id) {
        return null;
    }

    if (variant === "compact") {
        return (
            <ActionIcon {...props} onClick={handleChangeFavorite}>
                <Heart />
            </ActionIcon>
        );
    }

    return (
        <Button
            {...props}
            variant="white"
            size="small"
            className={cx(classes.favoriteActionButton, props.className)}
            onClick={handleChangeFavorite}>
            <Heart />
        </Button>
    );
};

export default FavoriteButton;
