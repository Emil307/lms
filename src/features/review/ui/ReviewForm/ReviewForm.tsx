import { Badge, Box, Divider, Flex, Group, Text, Title } from "@mantine/core";
import { FormikConfig } from "formik";
import { useMemo } from "react";
import { Button, Form, FRating, FTextarea, Rating } from "@shared/ui";
import { $sendReviewRequest, SendReviewRequest } from "@features/review";
import { getPluralString } from "@shared/utils";
import useStyles from "./ReviewForm.styles";

export interface ReviewFormProps {
    data: {
        name: string;
        rating: number;
        reviewCount: number;
        categories: Array<{
            id: number;
            name: string;
            slug: string;
        }>;
    };
    onClose: () => void;
}

const ReviewForm = ({ data, onClose }: ReviewFormProps) => {
    const { classes } = useStyles();
    const config: FormikConfig<SendReviewRequest> = {
        initialValues: {
            rating: 0,
            content: "",
        },
        validationSchema: $sendReviewRequest,
        onSubmit: () => {
            return;
        },
    };

    const renderCategories = useMemo(
        () =>
            data.categories.map((category) => (
                <Badge key={category.id} variant="outline" className={classes.category}>
                    {data.categories[0].name}
                </Badge>
            )),
        [data.categories]
    );

    return (
        <Box>
            <Group mb={8}>
                <Group sx={{ gap: 8 }}>{renderCategories}</Group>
                <Flex gap={8}>
                    <Flex gap={4}>
                        <Flex gap={2}>
                            <Rating defaultValue={1} count={1} readOnly size="small" />
                            <Text className={classes.ratingValue}>{data.rating}</Text>
                        </Flex>
                        <Text className={classes.ratingMaxValue}>из 5</Text>
                    </Flex>
                    <Divider className={classes.dividerDot} orientation="vertical" size={4} />
                    <Text className={classes.reviewInfo}>{`${data.reviewCount} ${getPluralString(
                        data.reviewCount,
                        "отзыв",
                        "отзыва",
                        "отзывов"
                    )}`}</Text>
                </Flex>
            </Group>
            <Title order={4} color="dark" mb={24}>
                {data.name}
            </Title>
            <Form config={config} disableOverlay>
                {({ values }) => (
                    <Flex direction="column" gap={24}>
                        <Flex direction="column" gap={8}>
                            <FRating name="rating" />
                            <Group sx={{ gap: 3 }}>
                                <Text className={classes.selectedRatingValue}>{`${values.rating} ${getPluralString(
                                    values.rating,
                                    "балл",
                                    "балла",
                                    "баллов"
                                )}`}</Text>
                                <Text className={classes.selectedRatingMaxValue}>из 5</Text>
                            </Group>
                        </Flex>
                        <FTextarea name="content" placeholder="Текст отзыва" sx={{ textarea: { minHeight: 224 } }} />
                        <Group sx={{ flexWrap: "nowrap" }}>
                            <Button type="button" variant="border" fullWidth onClick={onClose}>
                                Отмена
                            </Button>
                            <Button type="submit" variant="secondary" fullWidth>
                                Отправить
                            </Button>
                        </Group>
                    </Flex>
                )}
            </Form>
        </Box>
    );
};

export default ReviewForm;