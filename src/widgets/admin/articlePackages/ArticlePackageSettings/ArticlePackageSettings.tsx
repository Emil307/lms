import { Box, Flex, Title, Text } from "@mantine/core";
import React from "react";
import { Trash, AlignLeft } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { IconClipboardText, IconPercentage } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField } from "@shared/ui";
import { useAdminArticlePackage } from "@entities/articlePackage";
import { DeleteArticlePackageModal } from "@features/articlePackages";
import { PackageInfo } from "./components";
import useStyles from "./ArticlePackageSettings.styles";

export interface ArticlePackageSettingsProps {
    id: string;
}

const ArticlePackageSettings = ({ id }: ArticlePackageSettingsProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data: articlePackageData } = useAdminArticlePackage(id);

    const handleOpenEditPage = () => router.push({ pathname: "/admin/settings/article-packages/[id]/edit", query: { id } });

    const handleCloseDeleteModal = () => {
        closeModal("DELETE_ARTICLE_PACKAGE");
        router.push("/admin/settings/article-packages");
    };

    const openModalDeletePackage = () => {
        openModal({
            modalId: "DELETE_ARTICLE_PACKAGE",
            title: "Удаление пакета",
            centered: true,
            children: <DeleteArticlePackageModal id={id} name={articlePackageData?.name} onClose={handleCloseDeleteModal} />,
        });
    };

    const categories = articlePackageData?.categories.map(({ name }) => name).join(", ");
    const tags = articlePackageData?.tags.map(({ name }) => name).join(", ");
    const validity = () => {
        if (!articlePackageData?.discount?.startingDate || !articlePackageData.discount.finishingDate) {
            return "-";
        }

        return `${dayjs(articlePackageData.discount.startingDate).format("DD.MM.YYYY")} - ${dayjs(
            articlePackageData.discount.finishingDate,
        ).format("DD.MM.YYYY")}`;
    };

    return (
        <Box>
            <Box mt={32} className={classes.info}>
                <Flex direction="column" gap={32} w="100%">
                    <Flex gap={48} align="center">
                        <Title order={2} color="dark">
                            Данные пакета базы знаний
                        </Title>
                        <Button onClick={openModalDeletePackage} variant="text" leftIcon={<Trash />}>
                            Удалить пакет
                        </Button>
                    </Flex>
                    <Fieldset label="Общие" icon={<IconClipboardText />}>
                        <DisplayField label="Наименование" value={articlePackageData?.name} />
                        <DisplayField label="Категории" value={categories} />
                        <DisplayField label="Теги" value={tags} />
                        <DisplayField label="Полная стоимость пакета" value={`${articlePackageData?.fullPrice.toLocaleString("ru")} ₽`} />
                    </Fieldset>
                    <Fieldset label="Описание пакетного предложения" icon={<AlignLeft />}>
                        <Text className={classes.description}>{articlePackageData?.description}</Text>
                    </Fieldset>
                    {articlePackageData?.discount && (
                        <Fieldset label="Параметры скидки" icon={<IconPercentage />}>
                            <DisplayField label="Тип скидки" value={articlePackageData.discount.type === "currency" ? "₽" : "%"} />

                            <DisplayField label="Размер скидки" value={articlePackageData.discount.amount?.toString()} />

                            <DisplayField
                                label="Стоимость со скидкой"
                                value={`${articlePackageData.discountPrice?.toLocaleString("ru")} ₽`}
                            />
                            <DisplayField label="Период действия" value={validity()} />
                        </Fieldset>
                    )}
                </Flex>
                <Box>
                    <PackageInfo data={articlePackageData}>
                        <Button variant="secondary" mt={16} onClick={handleOpenEditPage}>
                            Редактировать данные
                        </Button>
                    </PackageInfo>
                </Box>
            </Box>
        </Box>
    );
};

export default ArticlePackageSettings;
