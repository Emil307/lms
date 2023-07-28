import { Box, Flex, BoxProps } from "@mantine/core";
import React from "react";
import { Trash, Edit3 } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { IconFileText } from "@tabler/icons-react";
import { Fieldset } from "@components/Fieldset";
import { Button, ContentByTextEditor, DisplayField, Heading } from "@shared/ui";
import { AdminArticle, useAdminArticle } from "@entities/article";
import { DeleteArticleModal } from "@features/articles";
import { InfoCard } from "@components/InfoCard";
import { fields } from "./constants";
import useStyles from "./ArticleSettings.styles";

export interface ArticleSettingsProps extends BoxProps {
    id: string;
}

const ArticleSettings = ({ id, ...props }: ArticleSettingsProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data: articleData } = useAdminArticle({ id });

    const handleOpenUpdateArticle = () => router.push({ pathname: "/admin/articles/[id]/edit", query: { id: String(articleData?.id) } });

    const handleCloseDeleteModal = () => {
        closeModal("DELETE_ARTICLE");
        router.push("/admin/articles");
    };

    const openModalDeleteArticle = () => {
        openModal({
            modalId: "DELETE_ARTICLE",
            title: "Удаление статьи",
            children: <DeleteArticleModal id={id} name={articleData?.name} onClose={handleCloseDeleteModal} />,
        });
    };

    const tagsNames = articleData?.tags.map((tag) => tag.name).join(", ");
    const subcategoriesNames = articleData?.subcategories.map((tag) => tag.name).join(", ");

    return (
        <Box {...props} className={classes.root}>
            <Flex direction="column" gap={32}>
                <Flex gap={48} align="center">
                    <Heading order={2}>Данные статьи</Heading>
                    <Button onClick={openModalDeleteArticle} variant="text" leftIcon={<Trash />}>
                        Удалить
                    </Button>
                </Flex>
                <Fieldset label="Настройки" icon={<Edit3 />}>
                    <DisplayField label="Название статьи" value={articleData?.name} />
                    <DisplayField label="Категория" value={articleData?.category?.name} />
                    <DisplayField label="Подкатегория" value={subcategoriesNames} />
                    <DisplayField label="Теги" value={tagsNames} />
                </Fieldset>
                <Fieldset label="Контент статьи" icon={<IconFileText />}>
                    <ContentByTextEditor data={articleData?.content} />
                </Fieldset>
            </Flex>
            <Box>
                <InfoCard<AdminArticle>
                    variant="whiteBg"
                    fields={fields}
                    hideFieldIfEmpty
                    values={articleData}
                    actionSlot={
                        <Button variant="secondary" onClick={handleOpenUpdateArticle}>
                            Редактировать данные
                        </Button>
                    }
                />
            </Box>
        </Box>
    );
};

export default ArticleSettings;
