import { Box, Flex, BoxProps } from "@mantine/core";
import React from "react";
import { Edit3 } from "react-feather";
import { useRouter } from "next/router";
import { IconFileText } from "@tabler/icons-react";
import { Fieldset } from "@components/Fieldset";
import { Button, ContentByTextEditor, DisplayField, Heading } from "@shared/ui";
import { GetAdminArticleResponse, useAdminArticle } from "@entities/article";
import { InfoCard } from "@components/InfoCard";
import { fields } from "./constants";
import useStyles from "./ArticleSettings.styles";
import { DeleteArticleButton } from "./components";

export interface ArticleSettingsProps extends BoxProps {
    id: string;
}

const ArticleSettings = ({ id, ...props }: ArticleSettingsProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data: articleData } = useAdminArticle({ id });

    const handleOpenUpdateArticlePage = () =>
        router.push({ pathname: "/admin/articles/[id]/edit", query: { id: String(articleData?.id) } });

    const tagsNames = articleData?.tags.map((tag) => tag.name).join(", ");
    const subcategoriesNames = articleData?.subcategories.map((tag) => tag.name).join(", ");

    return (
        <Flex className={classes.info} {...props}>
            <Flex className={classes.settingsInfo}>
                <Flex className={classes.headingSettingsInfo}>
                    <Heading order={2}>Данные статьи</Heading>
                    <DeleteArticleButton data={articleData} />
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
                <InfoCard<GetAdminArticleResponse>
                    values={articleData}
                    variant="whiteBg"
                    fields={fields}
                    hideFieldIfEmpty
                    actionSlot={
                        <Button variant="secondary" onClick={handleOpenUpdateArticlePage}>
                            Редактировать данные
                        </Button>
                    }
                />
            </Box>
        </Flex>
    );
};

export default ArticleSettings;
