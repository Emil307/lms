import { Box, Flex, BoxProps } from "@mantine/core";
import React from "react";
import { Edit3 } from "react-feather";
import { useRouter } from "next/router";
import { IconFileText } from "@tabler/icons-react";
import { Fieldset } from "@components/Fieldset";
import { Button, ContentByTextEditor, DisplayField, Heading } from "@shared/ui";
import { GetAdminArticleResponse, useAdminArticle } from "@entities/article";
import { useUserRole } from "@entities/auth";
import { InfoCard } from "@components/InfoCard";
import { Roles } from "@shared/types";
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

    const userRole = useUserRole();

    const handleOpenUpdateArticlePage = () =>
        router.push({ pathname: "/admin/articles/[id]/edit", query: { id: String(articleData?.id) } });

    const tagsNames = articleData?.tags.map((tag) => tag.name).join(", ");
    const subcategoriesNames = articleData?.subcategories.map((tag) => tag.name).join(", ");

    const renderInfoCardActions = () => {
        if (userRole?.name === Roles.teacher) {
            return null;
        }
        return (
            <Button variant="secondary" onClick={handleOpenUpdateArticlePage}>
                Редактировать данные
            </Button>
        );
    };

    return (
        <Flex className={classes.info} {...props}>
            <Flex className={classes.settingsInfo}>
                <Flex className={classes.headingSettingsInfo}>
                    <Heading order={2}>Данные статьи</Heading>
                    <DeleteArticleButton data={articleData} hidden={userRole?.name === Roles.teacher} />
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
                    actionSlot={renderInfoCardActions()}
                />
            </Box>
        </Flex>
    );
};

export default ArticleSettings;
