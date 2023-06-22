import { Box, Flex, Text, ThemeIcon, Title } from "@mantine/core";
import React from "react";
import { AlignLeft, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { IconClipboardText } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField, Rating } from "@shared/ui";
import { InfoCard } from "@components/InfoCard";
import { useAdminCourseReview, useUpdateCourseReviewPublishingStatus } from "@entities/courseReview";
import { getFullName } from "@shared/utils";
import { DeleteCourseReviewModal } from "@features/courseReviews";
import { fields } from "./constants";
import useStyles from "./CourseReviewSettings.styles";

export interface CourseReviewSettingsProps {
    id: string;
}

const CourseReviewSettings = ({ id }: CourseReviewSettingsProps) => {
    const { classes } = useStyles();
    const router = useRouter();
    const { data } = useAdminCourseReview({ id });
    const { mutate: updatePublishingStatus } = useUpdateCourseReviewPublishingStatus({ id });

    const dataCardInfo = {
        fio: getFullName({ data: data?.user.profile }),
        //TODO:
        courseName: data?.group.course || "",
        createdAt: dayjs(data?.createdAt).format("DD.MM.YYYY HH:mm") || "",
    };

    const labelPublishingSwitch = data?.isPublished ? "Снять с публикации" : "Опубликовать";

    const handleCloseDeleteModal = () => {
        closeModal("DELETE_COURSE_REVIEW");
        router.push("/admin/settings/course-reviews");
    };

    const openModalDeleteCourseReview = () => {
        openModal({
            modalId: "DELETE_COURSE_REVIEW",
            title: "Удаление отзыва",
            centered: true,
            children: <DeleteCourseReviewModal id={id} fullName={dataCardInfo.fio} onClose={handleCloseDeleteModal} />,
        });
    };

    const handleChangePublishingStatus = () => updatePublishingStatus({ isPublished: !data?.isPublished });

    return (
        <Box>
            <Box mt={32} className={classes.info}>
                <Flex direction="column" gap={32}>
                    <Flex gap={48} align="center">
                        <Title order={2}>Данные отзыва</Title>
                        <Button
                            onClick={openModalDeleteCourseReview}
                            variant="text"
                            leftIcon={
                                <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                                    <Trash />
                                </ThemeIcon>
                            }>
                            Удалить отзыв
                        </Button>
                    </Flex>
                    <Fieldset label="Детали" icon={<IconClipboardText />}>
                        <DisplayField label="ФИО" value={dataCardInfo.fio} />
                        {/* //TODO: */}
                        <DisplayField label="Курс" value={data?.group.course} />
                        <DisplayField label="Группа ученика" value={data?.group.name} />
                        <DisplayField
                            label="Оценка ученика"
                            render={() => (
                                <Flex gap={4}>
                                    <Flex align="center" gap={2}>
                                        <Rating defaultValue={1} count={1} readOnly size="small" />
                                        <Text className={classes.ratingValue}>{data?.score}</Text>
                                    </Flex>
                                    <Text className={classes.ratingMaxValue}>из 5</Text>
                                </Flex>
                            )}
                        />
                    </Fieldset>

                    <Fieldset label="Содержание отзыва" icon={<AlignLeft />}>
                        <Text className={classes.description}>{data?.content}</Text>
                    </Fieldset>
                </Flex>
                <Box>
                    <InfoCard
                        //TODO:
                        // avatar={{
                        //     src: data?.user.profile.avatar,
                        // }}
                        values={dataCardInfo}
                        variant="whiteBg"
                        fields={fields}
                        actionSlot={
                            <Button variant="secondary" onClick={handleChangePublishingStatus}>
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
