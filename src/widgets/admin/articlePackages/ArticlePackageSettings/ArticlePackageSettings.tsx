import { Box, Flex, FlexProps } from "@mantine/core";
import React from "react";
import { AlignLeft } from "react-feather";
import { useRouter } from "next/router";
import { IconClipboardText, IconPercentage } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField, Heading, Paragraph } from "@shared/ui";
import { GetAdminArticlePackageResponse, useAdminArticlePackage } from "@entities/articlePackage";
import { InfoCard } from "@components/InfoCard";
import { DeleteArticlePackageButton } from "./components";
import useStyles from "./ArticlePackageSettings.styles";
import { fields } from "./constants";

export interface ArticlePackageSettingsProps extends Omit<FlexProps, "children"> {
    id: string;
}

const ArticlePackageSettings = ({ id, ...props }: ArticlePackageSettingsProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data: articlePackageData } = useAdminArticlePackage(id);

    const handleOpenUpdateArticlePackagePage = () => router.push({ pathname: "/admin/settings/article-packages/[id]/edit", query: { id } });

    const categories = articlePackageData?.categories.map(({ name }) => name).join(", ");
    const tags = articlePackageData?.tags.map(({ name }) => name).join(", ");

    const renderValidity = () => {
        if (!articlePackageData?.discount) {
            return "-";
        }

        return `${dayjs(articlePackageData.discount.startingDate).format("DD.MM.YYYY")} - ${dayjs(
            articlePackageData.discount.finishingDate,
        ).format("DD.MM.YYYY")}`;
    };

    return (
        <Flex className={classes.info} {...props}>
            <Flex className={classes.settingsInfo}>
                <Flex className={classes.headingSettingsInfo}>
                    <Heading order={2}>Данные пакета базы знаний</Heading>
                    <DeleteArticlePackageButton data={articlePackageData} />
                </Flex>
                <Fieldset label="Общие" icon={<IconClipboardText />}>
                    <DisplayField label="Наименование" value={articlePackageData?.name} />
                    <DisplayField label="Категории" value={categories} />
                    <DisplayField label="Теги" value={tags} />
                    <DisplayField label="Полная стоимость пакета" value={`${articlePackageData?.fullPrice.toLocaleString("ru")} ₽`} />
                </Fieldset>
                <Fieldset label="Описание пакетного предложения" icon={<AlignLeft />}>
                    <Paragraph variant="small-m" color="neutralMain50">
                        {articlePackageData?.description}
                    </Paragraph>
                </Fieldset>
                {articlePackageData?.hasDiscount && (
                    <Fieldset label="Параметры скидки" icon={<IconPercentage />}>
                        <DisplayField label="Тип скидки" value={articlePackageData.discount?.type === "currency" ? "₽" : "%"} />
                        <DisplayField label="Размер скидки" value={articlePackageData.discount?.amount.toString()} />
                        <DisplayField label="Стоимость со скидкой" value={`${articlePackageData.discountPrice.toLocaleString("ru")} ₽`} />
                        <DisplayField label="Период действия" value={renderValidity()} />
                    </Fieldset>
                )}
            </Flex>
            <Box>
                <InfoCard<GetAdminArticlePackageResponse>
                    values={articlePackageData}
                    variant="whiteBg"
                    fields={fields}
                    actionSlot={
                        <Button variant="secondary" onClick={handleOpenUpdateArticlePackagePage}>
                            Редактировать данные
                        </Button>
                    }
                />
            </Box>
        </Flex>
    );
};

export default ArticlePackageSettings;
