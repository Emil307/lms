import { ActionIcon } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Heart } from "react-feather";
import { Button } from "@shared/ui";
import useStyles from "./FavoriteButton.styles";

export interface FavoriteButtonProps {
    isFavorite: boolean;
    courseId: number;
}

const FavoriteButton = ({ isFavorite }: FavoriteButtonProps) => {
    const { classes } = useStyles({ isFavorite });
    const isTablet = useMediaQuery("(max-width: 1440px)");
    //TODO: вернуться когда будет эндпоинт API для этого
    const handleFavorite = () => undefined;

    if (isTablet) {
        return (
            <ActionIcon className={classes.favoriteActionIcon} onClick={handleFavorite}>
                <Heart />
            </ActionIcon>
        );
    }
    return (
        <Button variant="white" leftIcon={<Heart />} size="small" onClick={handleFavorite} className={classes.favoriteActionButton}>
            Избранное
        </Button>
    );
};

export default FavoriteButton;
