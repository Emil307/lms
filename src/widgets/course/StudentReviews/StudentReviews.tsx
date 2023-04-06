import { Box, BoxProps, Flex, Group, Title, Text, TitleProps } from "@mantine/core";
import { Edit } from "react-feather";
import { GetCourseReviewsResponse, Review } from "@entities/course";
import { Button, Rating } from "@shared/ui";
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
        data: [
            {
                id: 1,
                firstName: "name of reviewer",
                lastName: "lastName of reviewer",
                patronymic: "patronymic of reviewer",
                avatar: {
                    name: "fileName.jpg",
                    path: "https://blog.ecotone.tech/content/images/size/w2000/2022/01/iStock-868962070--1-.jpg",
                    type: "image/jpg",
                    size: 12311,
                },
                rating: 3,
                course: {
                    id: 123,
                    name: "courseName",
                    slug: "courseSlug",
                    isPurchased: false,
                    isFavorite: true,
                },
                createdAt: "2023-02-01T13:13:11.000000Z",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            },
            {
                id: 2,
                firstName: "name of reviewer",
                lastName: "lastName of reviewer",
                patronymic: "patronymic of reviewer",
                avatar: {
                    name: "fileName.jpg",
                    path: "https://blog.ecotone.tech/content/images/size/w2000/2022/01/iStock-868962070--1-.jpg",
                    type: "image/jpg",
                    size: 12311,
                },
                rating: 1,
                course: {
                    id: 123,
                    name: "courseName",
                    slug: "courseSlug",
                    isPurchased: true,
                    isFavorite: false,
                },
                createdAt: "2023-02-01T13:13:11.000000Z",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            },
            {
                id: 3,
                firstName: "name of reviewer",
                lastName: "lastName of reviewer",
                patronymic: "patronymic of reviewer",
                avatar: {
                    name: "fileName.jpg",
                    path: "https://blog.ecotone.tech/content/images/size/w2000/2022/01/iStock-868962070--1-.jpg",
                    type: "image/jpg",
                    size: 12311,
                },
                rating: 3,
                course: {
                    id: 123,
                    name: "courseName",
                    slug: "courseSlug",
                    isPurchased: false,
                    isFavorite: false,
                },
                createdAt: "2023-02-01T13:13:11.000000Z",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            },
        ],
        meta: {
            pagination: {
                count: 1,
                total: 3,
                per_page: 1,
                current_page: 2,
                total_pages: 3,
                links: {
                    previous: "http =>//0.0.0.0/api/test?name=123&test=123&page=1",
                    next: "http =>//0.0.0.0/api/test?name=123&test=123&page=3",
                },
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
                    <Title order={2} {...titleProps}>
                        Отзывы студентов
                    </Title>
                    <Flex align="flex-end" gap={16}>
                        <Flex gap={4}>
                            <Flex align="center" gap={2}>
                                <Rating defaultValue={1} count={1} readOnly size="small" />
                                <Text className={classes.ratingValue}>{data.averageRating}</Text>
                            </Flex>
                            <Text className={classes.ratingMaxValue}>из 5</Text>
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
