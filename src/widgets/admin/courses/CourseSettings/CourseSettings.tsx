import { Flex, Text, ThemeIcon, Title, useMantineTheme } from "@mantine/core";
import { Button, DisplayField } from "@shared/ui";
import {  } from "react-feather";
import { Fieldset } from "@components/Fieldset";
import { InfoCard } from "@components/InfoCard";
import React from "react";
import { AdminCourse } from "@entities/course";
import { getInfoCardFields } from "./utils";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { getFullName } from "@shared/utils";
import { closeModal, openModal } from "@mantine/modals";
import { DeleteCourseModal, UpdateCoursePublicationModal } from "@features/courses";
import { AlignLeft as AlignLeftIcon, Percent as PercentIcon, Users as UsersIcon, Trash as TrashIcon } from "react-feather";
import FileMarkIcon from "public/icons/file-mark.svg";
import FileLeftIcon from "public/icons/file-left.svg";
import UserLeftIcon from "public/icons/user-left.svg";

interface CourseSettingsProps {
    data: AdminCourse;
}

const CourseSettings = ({ data }: CourseSettingsProps) => {
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
            centered: true,
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
            centered: true,
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

    return (
        <Flex gap={56} mt={32} align="start">
            <Flex direction="column" gap={32} w="100%">
                <Flex gap={48} align="center">
                    <Title order={2}>Настройки курса</Title>
                    <Button
                        onClick={handleOpenDeleteModal}
                        variant="text"
                        leftIcon={
                            <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                                <TrashIcon />
                            </ThemeIcon>
                        }>
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
                        <Text size={16} lh={"24px"} color={theme.colors.neutral_gray[0]}>
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
                //TODO: Добавить вывод рейтинга курса, когда будет готово на бэке
                image={{
                    src: data.cover?.absolutePath,
                    alt: "courseImage",
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
