import { Divider, Flex } from "@mantine/core";
import { Text } from "@mantine/core";
import { CourseRating } from "@entities/course";
import { Rating } from "@shared/ui";
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
        <Flex gap={8}>
            <Flex gap={4}>
                <Flex gap={2}>
                    <Rating defaultValue={1} count={1} readOnly size="small" />
                    <Text className={classes.ratingValue}>{data.averageRating}</Text>
                </Flex>
                <Text className={classes.ratingMaxValue}>из 5</Text>
            </Flex>
            <Divider className={classes.dividerDot} orientation="vertical" size={4} />
            <Text className={classes.reviewInfo}>{`${data.reviewsCount} ${getPluralString(
                data.reviewsCount,
                "отзыв",
                "отзыва",
                "отзывов"
            )}`}</Text>
        </Flex>
    );
};

export default RatingInfo;
