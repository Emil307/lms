import { ActionIcon } from "@mantine/core";
import { Heart } from "react-feather";
import { Button } from "@shared/ui";
import { Article, ArticleFromList, useUpdateArticleFavoriteStatus } from "@entities/article";
import { ArticleTypes } from "@shared/constant";
import useStyles from "./FavoriteButton.styles";

export interface FavoriteButtonProps {
    data: Article | ArticleFromList;
    articleType?: ArticleTypes;
    categoryId?: string;
    variant?: "compact" | "default";
}

const FavoriteButton = ({ data, variant = "default", categoryId, articleType }: FavoriteButtonProps) => {
    const { classes } = useStyles({ isFavorite: data.isFavorite });

    const updateFavorite = useUpdateArticleFavoriteStatus({ id: String(data.id), articleType, categoryId });

    const handleChangeFavorite = () => {
        updateFavorite.mutate({ isFavorite: !data.isFavorite });
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
        <Button variant="white" leftIcon={<Heart />} size="small" onClick={handleChangeFavorite} className={classes.favoriteActionButton}>
            Избранное
        </Button>
    );
};

export default FavoriteButton;
