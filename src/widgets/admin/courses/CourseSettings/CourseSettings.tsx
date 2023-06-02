import { Flex, Text, ThemeIcon, Title, useMantineTheme } from "@mantine/core";
import { Button, DisplayField } from "@shared/ui";
import { Trash, User as UserIcon } from "react-feather";
import { Fieldset } from "@components/Fieldset";
import { InfoCard } from "@components/InfoCard";
import React from "react";
import { AdminCourse } from "@entities/course";
import { getInfoCardFields } from "./utils";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { getFullName } from "@shared/utils";
import { closeModal, openModal } from "@mantine/modals";
import { DeleteCourseModal } from "@features/courses";

interface CourseSettingsProps {
    data: AdminCourse;
}

const CourseSettings = ({ data }: CourseSettingsProps) => {
    const router = useRouter();
    const theme = useMantineTheme();

    const goToUpdateCoursePage = () => {
        router.push({ pathname: "/admin/courses/[id]/edit", query: { id: String(data.id) } });
    };

    const closeDeleteCourseModal = () => closeModal("DELETE_COURSE");

    const handleCancelDeleteCourse = () => closeDeleteCourseModal();

    const handleSuccessDeleteCourse = () => {
        closeDeleteCourseModal();
        router.push("/admin/courses");
    };

    const openDeleteModal = () => {
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

    return (
        <Flex gap={56} mt={32} align="start">
            <Flex direction="column" gap={32} w="100%">
                <Flex gap={48} align="center">
                    <Title order={2}>Настройки курса</Title>
                    <Button
                        onClick={openDeleteModal}
                        variant="text"
                        leftIcon={
                            <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                                <Trash />
                            </ThemeIcon>
                        }>
                        Удалить курс
                    </Button>
                </Flex>

                <Fieldset label="Общая информация" icon={<UserIcon />}>
                    <DisplayField label="Наименование" value={data.name} />
                    {data.category && <DisplayField label="Категория" value={data.category.name} />}
                    {data.tags.length > 0 && <DisplayField label="Теги" value={data.tags.map((tag) => tag.name).join(", ")} />}
                    <DisplayField label="Стоимость курса" value={data.price > 0 ? `${data.price.toLocaleString("ru")} ₽` : "Бесплатно"} />
                </Fieldset>

                {data.description && (
                    <Fieldset label="Описание курса" icon={<UserIcon />}>
                        <Text size={16} lh={"24px"} color={theme.colors.neutral_gray[0]}>
                            {data.description}
                        </Text>
                    </Fieldset>
                )}

                {data.hasDiscount && data.discount && (
                    <Fieldset label="Скидка на курс" icon={<UserIcon />}>
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
                    <Fieldset label="Преподаватели курса" icon={<UserIcon />}>
                        <DisplayField
                            label="ФИО"
                            value={data.teachers
                                .map((teacher) => getFullName({ data: teacher.profile, startWithLastName: false, hidePatronymic: true }))
                                .join(", ")}
                        />
                    </Fieldset>
                )}

                {data.hasAuthors && data.authors.length > 0 && (
                    <Fieldset label="Авторы курса" icon={<UserIcon />}>
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
                    <Button variant="secondary" onClick={goToUpdateCoursePage}>
                        Редактировать данные
                    </Button>
                }
            />
        </Flex>
    );
};

export default CourseSettings;
