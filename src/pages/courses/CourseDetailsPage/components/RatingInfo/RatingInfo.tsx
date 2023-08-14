import { Flex } from "@mantine/core";
import { CourseRating } from "@entities/course";
import { Heading, Paragraph, Rating } from "@shared/ui";
import { getPluralString } from "@shared/utils";

export interface RatingInfoProps {
    data: CourseRating | null;
}

const RatingInfo = ({ data }: RatingInfoProps) => {
    if (!data) {
        return null;
    }

    return (
        <Flex align="flex-end" gap={16}>
            <Flex gap={4}>
                <Flex align="center" gap={2}>
                    <Rating defaultValue={1} count={1} readOnly size="small" />
                    <Heading order={2}>{data.averageRating}</Heading>
                </Flex>
                <Heading order={2} color="gray45">
                    из 5
                </Heading>
            </Flex>
            <Paragraph variant="small-semi">{`${data.reviewsCount} ${getPluralString(
                data.reviewsCount,
                "отзыв",
                "отзыва",
                "отзывов"
            )}`}</Paragraph>
        </Flex>
    );
};

export default RatingInfo;
