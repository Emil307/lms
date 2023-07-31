import { Badge, Divider, Flex, Group, Text } from "@mantine/core";
import { Button, FRating, FTextarea, Heading, ManagedForm, Paragraph, Rating } from "@shared/ui";
import { ToastType, createNotification, getPluralString } from "@shared/utils";
import { GroupFromList } from "@entities/group";
import { useCourse } from "@entities/course";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { CreateCourseReviewResponse, courseReviewApi } from "@entities/courseReview";
import { initialValues } from "./constants";
import { $CreateCourseReviewFormValidation, CreateCourseReviewFormValidation } from "./types";
import useStyles from "./CreateCourseReviewForm.styles";

export interface CreateCourseReviewFormProps {
    data: Pick<GroupFromList, "courseId" | "groupId">;
    onClose: () => void;
}

const CreateCourseReviewForm = ({ data, onClose }: CreateCourseReviewFormProps) => {
    const { classes } = useStyles();

    const { data: courseData } = useCourse({ id: String(data.courseId) });

    const createCourseReview = (values: CreateCourseReviewFormValidation) => {
        return courseReviewApi.createCourseReview({ ...values, courseGroupId: String(data.groupId) });
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Отзыв о курсе успешно создан",
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка создания отзыва о курсе",
        });
    };

    return (
        <Flex direction="column" gap={24}>
            <Group mb={8}>
                <Badge className={classes.category}>{courseData?.category?.name}</Badge>
                <Flex gap={8}>
                    <Flex gap={4}>
                        <Flex gap={2}>
                            <Rating defaultValue={1} count={1} readOnly size="small" />
                            <Text className={classes.ratingValue}>{courseData?.rating.averageRating}</Text>
                        </Flex>
                        <Text className={classes.ratingMaxValue}>из 5</Text>
                    </Flex>
                    <Divider className={classes.dividerDot} orientation="vertical" size={4} />
                    {courseData?.rating.reviewsCount && (
                        <Text className={classes.reviewInfo}>{`${courseData.rating.reviewsCount} ${getPluralString(
                            courseData.rating.reviewsCount,
                            "отзыв",
                            "отзыва",
                            "отзывов"
                        )}`}</Text>
                    )}
                </Flex>
            </Group>
            <Heading order={4}>{courseData?.name}</Heading>
            <ManagedForm<CreateCourseReviewFormValidation, CreateCourseReviewResponse>
                initialValues={initialValues}
                validationSchema={$CreateCourseReviewFormValidation}
                mutationKey={[MutationKeys.CREATE_COURSE_REVIEW]}
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_COURSE, String(data.courseId)] }]}
                mutationFunction={createCourseReview}
                onSuccess={onSuccess}
                onError={onError}
                disableOverlay>
                {({ values }) => (
                    <Flex direction="column" gap={24}>
                        <Flex direction="column" gap={8}>
                            <FRating name="score" />
                            <Flex gap={3}>
                                <Paragraph variant="small-semi">{`${values.score} ${getPluralString(
                                    values.score,
                                    "балл",
                                    "балла",
                                    "баллов"
                                )}`}</Paragraph>
                                <Paragraph variant="small-m" color="gray45">
                                    из 5
                                </Paragraph>
                            </Flex>
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
            </ManagedForm>
        </Flex>
    );
};

export default CreateCourseReviewForm;
