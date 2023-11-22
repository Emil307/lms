import { Box, Flex, FlexProps } from "@mantine/core";
import React from "react";
import { AlignLeft } from "react-feather";
import { useRouter } from "next/router";
import { IconClipboardText, IconPercentage } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField, Heading, Paragraph } from "@shared/ui";
import { AdminCoursePackageDetails, useAdminCoursePackage } from "@entities/coursePackage";
import { InfoCard } from "@components/InfoCard";
import { DeleteCoursePackageButton } from "./components";
import useStyles from "./CoursePackageSettings.styles";
import { fields } from "./constants";

export interface CoursePackageSettingsProps extends Omit<FlexProps, "children"> {
    id: string;
}

const CoursePackageSettings = ({ id, ...props }: CoursePackageSettingsProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data: coursePackageData } = useAdminCoursePackage(id);

    const handleOpenUpdateCoursePackagePage = () => router.push({ pathname: "/admin/settings/course-packages/[id]/edit", query: { id } });

    const renderValidity = () => {
        if (!coursePackageData?.discount) {
            return "-";
        }

        return `${dayjs(coursePackageData.discount.startingDate).format("DD.MM.YYYY")} - ${dayjs(
            coursePackageData.discount.finishingDate
        ).format("DD.MM.YYYY")}`;
    };

    return (
        <Flex className={classes.info} {...props}>
            <Flex className={classes.settingsInfo}>
                <Flex className={classes.headingSettingsInfo}>
                    <Heading order={2}>Данные пакета курсов</Heading>
                    <DeleteCoursePackageButton data={coursePackageData} />
                </Flex>
                <Fieldset label="Общие" icon={<IconClipboardText />}>
                    <DisplayField label="Наименование" value={coursePackageData?.name} />
                    <DisplayField label="Стоимость" value={`${coursePackageData?.price.toLocaleString("ru")} ₽`} />
                </Fieldset>
                <Fieldset label="Описание пакетного предложения" icon={<AlignLeft />}>
                    <Paragraph variant="small-m" color="gray45">
                        {coursePackageData?.description}
                    </Paragraph>
                </Fieldset>
                {coursePackageData?.hasDiscount && (
                    <Fieldset label="Параметры скидки" icon={<IconPercentage />}>
                        <DisplayField label="Тип скидки" value={coursePackageData.discount?.type === "currency" ? "₽" : "%"} />
                        <DisplayField label="Размер скидки" value={coursePackageData.discount?.amount.toString()} />
                        <DisplayField label="Стоимость со скидкой" value={`${coursePackageData.discountPrice.toLocaleString("ru")} ₽`} />
                        <DisplayField label="Период действия" value={renderValidity()} />
                    </Fieldset>
                )}
            </Flex>
            <Box>
                <InfoCard<AdminCoursePackageDetails>
                    image={{
                        src: coursePackageData?.cover?.absolutePath,
                        alt: "course package image",
                    }}
                    values={coursePackageData}
                    variant="whiteBg"
                    fields={fields}
                    actionSlot={
                        <Button variant="secondary" onClick={handleOpenUpdateCoursePackagePage}>
                            Редактировать данные
                        </Button>
                    }
                />
            </Box>
        </Flex>
    );
};

export default CoursePackageSettings;
