import { Heart } from "react-feather";
import { useMediaQuery } from "@mantine/hooks";
import { ActionIcon } from "@mantine/core";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import useStyles from "./FavoriteRedirectButton.styles";

const FavoriteRedirectButton = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const isTablet = useMediaQuery("(max-width: 744px)");

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
