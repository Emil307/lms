import { Box, Flex, ThemeIcon, Title, Text } from "@mantine/core";
import React from "react";
import { Trash, Edit3 } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { IconFileText } from "@tabler/icons-react";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField } from "@shared/ui";
import { useAdminArticle } from "@entities/article";
import { DeleteArticleModal } from "@features/articles";
import useStyles from "./ArticleSettings.styles";

export interface ArticleSettingsProps {
    id: string;
}

const ArticleSettings = ({ id }: ArticleSettingsProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data: articleData } = useAdminArticle(id);

    const handleOpenEditArticle = () => router.push({ pathname: "/admin/articles/[id]/edit", query: { id: String(articleData?.id) } });

    const handleCloseDeleteModal = () => closeModal("DELETE_ARTICLE");

    const openModalDeleteArticle = () => {
        openModal({
            modalId: "DELETE_ARTICLE",
            title: "Удаление статьи",
            centered: true,
            children: <DeleteArticleModal id={id} name={articleData?.name} onClose={handleCloseDeleteModal} />,
        });
    };

    const tagsNames = articleData?.tags.map((tag) => tag.name).join(", ");
    const subcategoriesNames = articleData?.subcategories.map((tag) => tag.name).join(", ");

    return (
        <Box>
            <Box mt={32} className={classes.info}>
                <Flex direction="column" gap={32}>
                    <Flex gap={48} align="center">
                        <Title order={2} color="dark">
                            Данные статьи
                        </Title>
                        <Button
                            onClick={openModalDeleteArticle}
                            variant="text"
                            leftIcon={
                                <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                                    <Trash />
                                </ThemeIcon>
                            }>
                            Удалить
                        </Button>
                    </Flex>
                    <Fieldset label="Настройки" icon={<Edit3 />}>
                        <DisplayField label="Название статьи" value={articleData?.name} />
                        <DisplayField label="Категория" value={articleData?.category.name} />
                        <DisplayField label="Подкатегория" value={subcategoriesNames} />
                        <DisplayField label="Теги" value={tagsNames} />
                    </Fieldset>
                    <Fieldset label="Контент статьи" icon={<IconFileText />}>
                        <Text color="dark" dangerouslySetInnerHTML={{ __html: articleData?.content || "" }} />
                    </Fieldset>
                </Flex>
                <Box>
                    <Flex className={classes.groupInfo}>
                        <DisplayField label="Статья" value={articleData?.name} variant="compact" />
                        <DisplayField label="Категория" value={articleData?.category.name} variant="compact" />
                        <Button variant="secondary" mt={16} onClick={handleOpenEditArticle}>
                            Редактировать данные
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default ArticleSettings;
