import { Heart } from "react-feather";
import { ActionIcon } from "@mantine/core";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { useMedia } from "@shared/utils";
import useStyles from "./FavoriteRedirectButton.styles";

const FavoriteRedirectButton = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const isTablet = useMedia("sm");

    const handleOpenFavoriteCoursesPage = () => router.push("/my-courses/favorite");

    if (isTablet) {
        return (
            <ActionIcon className={classes.actionIcon} onClick={handleOpenFavoriteCoursesPage}>
                <Heart />
            </ActionIcon>
        );
    }

    return (
        <Button variant="border" leftIcon={<Heart />} onClick={handleOpenFavoriteCoursesPage}>
            Избранные курсы
        </Button>
    );
};

export default FavoriteRedirectButton;
