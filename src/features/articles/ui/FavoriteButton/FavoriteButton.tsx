import { ActionIcon } from "@mantine/core";
import { Heart } from "react-feather";
import { Button } from "@shared/ui";
import { ArticleFromList, GetArticleResponse, useUpdateArticleFavorite } from "@entities/article";
import useStyles from "./FavoriteButton.styles";

export interface FavoriteButtonProps {
    data: ArticleFromList | GetArticleResponse;
    variant?: "compact" | "default";
}

const FavoriteButton = ({ data, variant = "default" }: FavoriteButtonProps) => {
    const { classes } = useStyles({ isFavorite: data.isFavorite });

    const updateFavorite = useUpdateArticleFavorite(String(data.id));

    const handleChangeFavorite = () => {
        updateFavorite.mutate(!data.isFavorite);
    };

    if (!data.isAvailable) {
        return null;
    }

    if (variant === "compact") {
        return (
            <ActionIcon className={classes.favoriteActionIcon} onClick={handleChangeFavorite}>
                <Heart />
            </ActionIcon>
        );
    }
    return (
        <Button
            variant="white"
            leftIcon={<Heart />}
            size="small"
            disabled
            onClick={handleChangeFavorite}
            className={classes.favoriteActionButton}>
            Избранное
        </Button>
    );
};

export default FavoriteButton;
