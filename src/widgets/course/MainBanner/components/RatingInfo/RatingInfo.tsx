import { Flex } from "@mantine/core";
import { CourseRating } from "@entities/course";
import { Heading, Paragraph, Rating } from "@shared/ui";
import { getPluralString } from "@shared/utils";
import useStyles from "./RatingInfo.styles";

export interface RatingInfoProps {
    data: CourseRating | null;
}

const RatingInfo = ({ data }: RatingInfoProps) => {
    const { classes } = useStyles();

    if (!data) {
        return null;
    }

    return (
        <Flex align="center" gap={16} className={classes.ratingWrapper}>
            <Flex className={classes.iconWrapper}>
                <Rating defaultValue={1} count={1} readOnly size="small" />
            </Flex>
            <Flex direction="column" gap={4}>
                <Flex align="center" gap={2}>
                    <Heading order={2}>{data.averageRating}</Heading>
                </Flex>
                <Paragraph variant="small-semi" color="gray45">{`${data.reviewsCount} ${getPluralString(
                    data.reviewsCount,
                    "отзыв",
                    "отзыва",
                    "отзывов"
                )}`}</Paragraph>
            </Flex>
        </Flex>
    );
};

export default RatingInfo;
