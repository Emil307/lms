import { Flex, Text, ThemeIcon, useMantineTheme } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { closeModal, openModal } from "@mantine/modals";
import { AlignLeft as AlignLeftIcon, Percent as PercentIcon, Users as UsersIcon, Trash as TrashIcon } from "react-feather";
import { Button, DisplayField, Heading } from "@shared/ui";
import { DeleteCourseModal, UpdateCoursePublicationModal } from "@features/courses";
import { getFullName } from "@shared/utils";
import { AdminCourse } from "@entities/course";
import { InfoCard } from "@components/InfoCard";
import { Fieldset } from "@components/Fieldset";
import FileMarkIcon from "public/icons/file-mark.svg";
import FileLeftIcon from "public/icons/file-left.svg";
import UserLeftIcon from "public/icons/user-left.svg";
import IconStarFull from "@public/icons/icon24px/rating/star-full.svg";
import { getInfoCardFields } from "./utils";
import useStyles from "./CourseSettings.styles";

interface CourseSettingsProps {
    data: AdminCourse;
}

const CourseSettings = ({ data }: CourseSettingsProps) => {
    const { classes } = useStyles();
    const router = useRouter();
    const theme = useMantineTheme();

    const handleGoToUpdateCoursePage = () => {
        router.push({ pathname: "/admin/courses/[id]/edit", query: { id: String(data.id) } });
    };

    const closeDeleteCourseModal = () => closeModal("DELETE_COURSE");
    const closeUpdateCoursePublicationModal = () => closeModal("UPDATE_COURSE_PUBLICATION");

    const handleCancelDeleteCourse = () => closeDeleteCourseModal();

    const handleSuccessDeleteCourse = () => {
        closeDeleteCourseModal();
        router.push("/admin/courses");
    };

    const handleOpenDeleteModal = () => {
        openModal({
            modalId: "DELETE_COURSE",
            title: "Удаление курса",
            children: (
                <DeleteCourseModal
                    id={String(data.id)}
                    name={data.name}
                    onCancel={handleCancelDeleteCourse}
                    onSuccess={handleSuccessDeleteCourse}
                />
            ),
        });
    };

    const handleOpenCoursePublicationModal = () => {
        openModal({
            modalId: "UPDATE_COURSE_PUBLICATION",
            title: "Опубликовать курс",
            children: (
                <UpdateCoursePublicationModal
                    id={String(data.id)}
                    name={data.name}
                    coverSrc={data.cover?.absolutePath}
                    onCancel={closeUpdateCoursePublicationModal}
                    onSuccess={closeUpdateCoursePublicationModal}
                />
            ),
        });
    };

    const renderRating = () => {
        if (!data.rating || !data.rating.reviewsCount) {
            return null;
        }
        return (
            <Flex className={classes.ratingWrapper} gap={4} align="center">
                <ThemeIcon
                    sx={(theme) => ({
                        width: 24,
                        path: {
                            fill: theme.colors.secondary[0],
                            stroke: theme.colors.secondary[0],
                        },
                    })}>
                    <IconStarFull />
                </ThemeIcon>
                <Text className={classes.rating}>
                    <Text className={classes.currentRating}>{String(data.rating.averageRating).replace(".", ",")}</Text>
                    <Text className={classes.maxRating}> из 5</Text>
                </Text>
            </Flex>
        );
    };

    return (
        <Flex gap={56} mt={32} align="start">
            <Flex direction="column" gap={32} w="100%">
                <Flex gap={48} align="center">
                    <Heading order={2}>Настройки курса</Heading>
                    <Button onClick={handleOpenDeleteModal} variant="text" leftIcon={<TrashIcon />}>
                        Удалить курс
                    </Button>
                </Flex>

                <Fieldset label="Общая информация" icon={<FileLeftIcon />}>
                    <DisplayField label="Наименование" value={data.name} />
                    {data.category && <DisplayField label="Категория" value={data.category.name} />}
                    {data.tags.length > 0 && <DisplayField label="Теги" value={data.tags.map((tag) => tag.name).join(", ")} />}
                    <DisplayField label="Стоимость курса" value={data.price > 0 ? `${data.price.toLocaleString("ru")} ₽` : "Бесплатно"} />
                </Fieldset>

                {data.description && (
                    <Fieldset label="Описание курса" icon={<AlignLeftIcon />}>
                        <Text size={16} lh="24px" color={theme.colors.neutral_gray[0]}>
                            {data.description}
                        </Text>
                    </Fieldset>
                )}

                {data.hasDiscount && data.discount && (
                    <Fieldset label="Скидка на курс" icon={<PercentIcon />}>
                        <DisplayField label="Тип скидки" value={data.discount.type === "percentage" ? "%" : "₽"} />
                        <DisplayField label="Размер скидки" value={String(data.discount.amount)} />
                        <DisplayField label="Стоимость со скидкой" value={`${data.discountPrice.toLocaleString("ru")} ₽`} />
                        <DisplayField
                            label="Период действия"
                            value={`${dayjs(data.discount.startingDate).format("DD.MM.YYYY")}-${dayjs(data.discount.finishingDate).format(
                                "DD.MM.YYYY"
                            )}`}
                        />
                    </Fieldset>
                )}

                {data.hasTeachers && data.teachers.length > 0 && (
                    <Fieldset label="Преподаватели курса" icon={<UsersIcon />}>
                        <DisplayField
                            label="ФИО"
                            value={data.teachers
                                .map((teacher) => getFullName({ data: teacher.profile, startWithLastName: false, hidePatronymic: true }))
                                .join(", ")}
                        />
                    </Fieldset>
                )}

                {data.hasAuthors && data.authors.length > 0 && (
                    <Fieldset label="Авторы курса" icon={<UserLeftIcon />}>
                        <DisplayField
                            label="ФИО"
                            value={data.authors
                                .map((author) => getFullName({ data: author, startWithLastName: false, hidePatronymic: true }))
                                .join(", ")}
                        />
                    </Fieldset>
                )}
            </Flex>

            <InfoCard<AdminCourse>
                variant="whiteBg"
                image={{
                    src: data.cover?.absolutePath,
                    alt: "courseImage",
                    children: renderRating(),
                }}
                fields={getInfoCardFields(data)}
                hideFieldIfEmpty
                values={data}
                actionSlot={
                    <>
                        <Button variant="secondary" onClick={handleGoToUpdateCoursePage}>
                            Редактировать данные
                        </Button>
                        {!data.isFulfillment && (
                            <Button variant="border" leftIcon={<FileMarkIcon />} onClick={handleOpenCoursePublicationModal}>
                                Опубликовать курс
                            </Button>
                        )}
                    </>
                }
            />
        </Flex>
    );
};

export default CourseSettings;
