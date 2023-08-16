import { PlusCircle } from "react-feather";
import { useMediaQuery } from "@mantine/hooks";
import { ActionIcon } from "@mantine/core";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import useStyles from "./CreateStaticReviewButton.styles";

const CreateStaticReviewButton = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const redirectCreateReview = () => router.push({ pathname: "/admin/settings/main-page/reviews/create" });

    const isTablet = useMediaQuery("(max-width: 744px)");

    if (isTablet) {
        return (
            <ActionIcon className={classes.actionIcon} onClick={redirectCreateReview}>
                <PlusCircle />
            </ActionIcon>
        );
    }

    return (
        <Button variant="text" leftIcon={<PlusCircle />} onClick={redirectCreateReview}>
            Добавить отзыв
        </Button>
    );
};

export default CreateStaticReviewButton;