import { Flex, ThemeIcon } from "@mantine/core";
import { CourseRating } from "@entities/course";
import { Heading, Paragraph } from "@shared/ui";
import { getPluralString } from "@shared/utils";
import IconStarDefault from "public/icons/icon24px/rating/star-default.svg";
import useStyles from "./RatingInfo.styles";

export interface RatingInfoProps {
    data: CourseRating | null;
}

const RatingInfo = ({ data }: RatingInfoProps) => {
    const { classes } = useStyles();

    if (!data) {
        return null;
    }

    const reviewsCountLabel = data.reviewsCount >= 100 ? "99+" : data.reviewsCount;
    const reviewsCount = Math.min(data.reviewsCount, 100);

    return (
        <Flex align="center" gap={16} className={classes.ratingWrapper}>
            <Flex className={classes.iconWrapper}>
                <ThemeIcon
                    sx={(theme) => ({
                        width: 24,
                        path: {
                            stroke: theme.colors.errorDark[0],
                        },
                    })}>
                    <IconStarDefault />
                </ThemeIcon>
            </Flex>
            <Flex direction="column">
                <Flex align="center">
                    <Heading order={2} color="dark">
                        {data.averageRating}
                    </Heading>
                </Flex>
                <Paragraph variant="small-m" color="neutralMain50">{`${reviewsCountLabel} ${getPluralString(
                    reviewsCount,
                    "отзыв",
                    "отзыва",
                    "отзывов"
                )}`}</Paragraph>
            </Flex>
        </Flex>
    );
};

export default RatingInfo;
