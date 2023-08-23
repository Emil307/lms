import { ActionIcon, BoxProps } from "@mantine/core";
import { Heart } from "react-feather";
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

    const updateFavorite = useUpdateCourseFavoriteStatus({ id: String(data.id) });

    const handleChangeFavorite = () => {
        updateFavorite.mutate({ isFavorite: !data.isFavorite });
    };

    if (!user?.id) {
        return null;
    }

    if (variant === "compact") {
        return (
            <ActionIcon {...props} className={cx(classes.favoriteActionIcon, props.className)} onClick={handleChangeFavorite}>
                <Heart />
            </ActionIcon>
        );
    }
    return (
        <Button
            {...props}
            variant="white"
            leftIcon={<Heart />}
            size="small"
            className={cx(classes.favoriteActionButton, props.className)}
            onClick={handleChangeFavorite}>
            Избранное
        </Button>
    );
};

export default FavoriteButton;
