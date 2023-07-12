import { Box, BoxProps, Flex, Group, Text, TitleProps } from "@mantine/core";
import { Edit } from "react-feather";
import { GetCourseReviewsResponse, Review } from "@entities/course";
import { Button, Heading, Rating } from "@shared/ui";
import { getPluralString } from "@shared/utils";
import { Carousel } from "@components/Carousel";
import { ReviewCard } from "@features/courses";
import useStyles from "./StudentReviews.styles";

export interface StudentReviewsProps extends Omit<BoxProps, "children"> {
    titleProps?: TitleProps;
}

const data: GetCourseReviewsResponse = {
    averageRating: 4.8,
    reviewCount: 12,
    reviews: {
        data: [],

        pagination: {
            count: 1,
            total: 3,
            perPage: 1,
            currentPage: 2,
            totalPages: 3,
            links: {
                previous: "http =>//0.0.0.0/api/test?name=123&test=123&page=1",
                next: "http =>//0.0.0.0/api/test?name=123&test=123&page=3",
            },
        },
    },
};

const StudentReviews = ({ titleProps, ...props }: StudentReviewsProps) => {
    const { classes } = useStyles();
    return (
        <Box {...props} className={classes.root}>
            <Group sx={{ justifyContent: "space-between", marginBottom: 32 }}>
                <Group sx={{ columnGap: 24 }}>
                    <Heading order={2} {...titleProps}>
                        Отзывы студентов
                    </Heading>
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
                        <Text className={classes.reviewInfo}>{`${data.reviewCount} ${getPluralString(
                            data.averageRating,
                            "отзыв",
                            "отзыва",
                            "отзывов"
                        )}`}</Text>
                    </Flex>
                </Group>
                <Button variant="text" leftIcon={<Edit />}>
                    Написать отзыв
                </Button>
            </Group>
            <Carousel<Review> data={data.reviews.data} slideSize={424}>
                {(props) => <ReviewCard {...props} w={424} />}
            </Carousel>
        </Box>
    );
};

export default StudentReviews;
