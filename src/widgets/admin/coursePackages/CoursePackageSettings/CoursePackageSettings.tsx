import { Box, Flex, Title, Text } from "@mantine/core";
import React from "react";
import { Trash, AlignLeft } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { IconClipboardText, IconPercentage } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField } from "@shared/ui";
import { useAdminCoursePackage } from "@entities/coursePackage";
import { DeleteCoursePackageModal } from "@features/coursePackages";
import { PackageInfo } from "./components";
import useStyles from "./CoursePackageSettings.styles";

export interface CoursePackageSettingsProps {
    id: string;
}

const CoursePackageSettings = ({ id }: CoursePackageSettingsProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data: coursePackageData } = useAdminCoursePackage(id);

    const handleOpenEditPage = () => router.push({ pathname: "/admin/settings/course-packages/[id]/edit", query: { id } });

    const handleCloseDeleteModal = () => closeModal("DELETE_COURSE_PACKAGE");

    const openModalDeleteCoursePackage = () => {
        openModal({
            modalId: "DELETE_COURSE_PACKAGE",
            title: "Удаление пакета",
            centered: true,
            children: <DeleteCoursePackageModal id={id} name={coursePackageData?.name} onClose={handleCloseDeleteModal} />,
        });
    };

    const validity = () => {
        if (!coursePackageData?.discount?.startingDate || !coursePackageData.discount.finishingDate) {
            return "-";
        }

        return `${dayjs(coursePackageData.discount.startingDate).format("DD.MM.YYYY")} - ${dayjs(
            coursePackageData.discount.finishingDate
        ).format("DD.MM.YYYY")}`;
    };

    return (
        <Box>
            <Box mt={32} className={classes.info}>
                <Flex direction="column" gap={32} w="100%">
                    <Flex gap={48} align="center">
                        <Title order={2} color="dark">
                            Данные пакета курсов
                        </Title>
                        <Button onClick={openModalDeleteCoursePackage} variant="text" leftIcon={<Trash />}>
                            Удалить пакет
                        </Button>
                    </Flex>
                    <Fieldset label="Общие" icon={<IconClipboardText />}>
                        <DisplayField label="Наименование" value={coursePackageData?.name} />
                        <DisplayField label="Стоимость" value={`${coursePackageData?.price.toLocaleString("ru")} ₽`} />
                    </Fieldset>
                    <Fieldset label="Описание пакетного предложения" icon={<AlignLeft />}>
                        <Text className={classes.description} dangerouslySetInnerHTML={{ __html: coursePackageData?.description || "" }} />
                    </Fieldset>
                    {coursePackageData?.discount && (
                        <Fieldset label="Параметры скидки" icon={<IconPercentage />}>
                            <DisplayField label="Тип скидки" value={coursePackageData.discount.type === "currency" ? "₽" : "%"} />
                            <DisplayField label="Размер скидки" value={coursePackageData.discount.amount?.toString()} />
                            <DisplayField
                                label="Стоимость со скидкой"
                                value={`${coursePackageData.discountPrice.toLocaleString("ru")} ₽`}
                            />
                            <DisplayField label="Период действия" value={validity()} />
                        </Fieldset>
                    )}
                </Flex>
                <Box>
                    <PackageInfo data={coursePackageData}>
                        <Button variant="secondary" mt={16} onClick={handleOpenEditPage}>
                            Редактировать данные
                        </Button>
                    </PackageInfo>
                </Box>
            </Box>
        </Box>
    );
};

export default CoursePackageSettings;
