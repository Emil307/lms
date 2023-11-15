import { Badge, Divider, Flex, Group, Text } from "@mantine/core";
import { FControlButtons, FRating, FTextarea, Heading, Loader, ManagedForm, Paragraph, Rating } from "@shared/ui";
import { ToastType, createNotification, getPluralString } from "@shared/utils";
import { GroupFromList, useGroup } from "@entities/group";
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

    const { data: groupData, isLoading, isError } = useGroup({ id: String(data.groupId) });

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

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Flex direction="column" gap={24}>
            <Flex direction="column" gap={8}>
                <Group>
                    {groupData.category && <Badge className={classes.category}>{groupData.category.name}</Badge>}
                    <Flex gap={8}>
                        <Flex gap={4}>
                            <Flex gap={2}>
                                <Rating defaultValue={1} count={1} readOnly size="small" />
                                <Text className={classes.ratingValue}>{groupData.rating.averageRating}</Text>
                            </Flex>
                            <Text className={classes.ratingMaxValue}>из 5</Text>
                        </Flex>
                        <Divider className={classes.dividerDot} orientation="vertical" size={4} />
                        <Text className={classes.reviewInfo}>{`${groupData.rating.reviewsCount} ${getPluralString(
                            groupData.rating.reviewsCount,
                            "отзыв",
                            "отзыва",
                            "отзывов"
                        )}`}</Text>
                    </Flex>
                </Group>
                <Heading order={4}>{groupData.name}</Heading>
            </Flex>

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
                        <FControlButtons variant="modal" cancelButtonText="Отмена" submitButtonText="Отправить" onClose={onClose} />
                    </Flex>
                )}
            </ManagedForm>
        </Flex>
    );
};

export default CreateCourseReviewForm;
