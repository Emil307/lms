import { Box, Flex, Text } from "@mantine/core";
import React from "react";
import { AlignLeft, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { IconClipboardText } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField, Heading, Rating } from "@shared/ui";
import { InfoCard } from "@components/InfoCard";
import { useAdminCourseReview, useUpdateCourseReviewPublishingStatus } from "@entities/courseReview";
import { DeleteCourseReviewModal } from "@features/courseReviews";
import { fields } from "./constants";
import useStyles from "./CourseReviewSettings.styles";
import { CourseReviewCardInfoFields } from "./types";
import { getDataInfoCard } from "./utils";

export interface CourseReviewSettingsProps {
    id: string;
}

const CourseReviewSettings = ({ id }: CourseReviewSettingsProps) => {
    const { classes } = useStyles();
    const router = useRouter();
    const { data: courseReviewData } = useAdminCourseReview({ id });
    const { mutate: updatePublishingStatus } = useUpdateCourseReviewPublishingStatus({ id });

    const labelPublishingSwitch = courseReviewData?.isPublished ? "Снять с публикации" : "Опубликовать";
    const variantPublishButton = courseReviewData?.isPublished ? "border" : "secondary";

    const dataInfoCard = getDataInfoCard(courseReviewData);

    const handleCloseDeleteModal = () => {
        closeModal("DELETE_COURSE_REVIEW");
        router.push("/admin/settings/course-reviews");
    };

    const openModalDeleteCourseReview = () => {
        openModal({
            modalId: "DELETE_COURSE_REVIEW",
            title: "Удаление отзыва",
            centered: true,
            children: <DeleteCourseReviewModal id={id} fullName={dataInfoCard.fio} onClose={handleCloseDeleteModal} />,
        });
    };

    const handleChangePublishingStatus = () => updatePublishingStatus({ isPublished: !courseReviewData?.isPublished });

    return (
        <Box>
            <Box mt={32} className={classes.info}>
                <Flex direction="column" gap={32}>
                    <Flex gap={48} align="center">
                        <Heading order={2}>Данные отзыва</Heading>
                        <Button onClick={openModalDeleteCourseReview} variant="text" leftIcon={<Trash />}>
                            Удалить отзыв
                        </Button>
                    </Flex>
                    <Fieldset label="Детали" icon={<IconClipboardText />}>
                        <DisplayField label="ФИО" value={dataInfoCard.fio} />
                        <DisplayField label="Курс" value={courseReviewData?.group.course.name} />
                        <DisplayField label="Группа ученика" value={courseReviewData?.group.name} />
                        <DisplayField
                            label="Оценка ученика"
                            render={() => (
                                <Flex gap={4}>
                                    <Flex align="center" gap={2}>
                                        <Rating defaultValue={1} count={1} readOnly size="small" />
                                        <Text className={classes.ratingValue}>{courseReviewData?.score}</Text>
                                    </Flex>
                                    <Text className={classes.ratingMaxValue}>из 5</Text>
                                </Flex>
                            )}
                        />
                    </Fieldset>

                    <Fieldset label="Содержание отзыва" icon={<AlignLeft />}>
                        <Text className={classes.description}>{courseReviewData?.content}</Text>
                    </Fieldset>
                </Flex>
                <Box>
                    <InfoCard<CourseReviewCardInfoFields>
                        avatar={{
                            src: courseReviewData?.user.profile.avatar?.absolutePath,
                        }}
                        values={dataInfoCard}
                        variant="whiteBg"
                        fields={fields}
                        actionSlot={
                            <Button variant={variantPublishButton} onClick={handleChangePublishingStatus}>
                                {labelPublishingSwitch}
                            </Button>
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default CourseReviewSettings;
