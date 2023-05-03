import { Flex, FlexProps, ThemeIcon, Text, Title, ActionIcon } from "@mantine/core";
import { memo } from "react";
import { IconArrowNarrowRight, IconBook2 } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { ArticleCategory } from "@entities/article";
import { getPluralString } from "@shared/utils";
import useStyles from "./ArticleCategoryItem.styles";

export interface ArticleCategoryItemProps extends FlexProps {
    data: ArticleCategory;
}

const MemoizedArticleCategoryItem = memo(function ArticleCategoryItem({ data, ...props }: ArticleCategoryItemProps) {
    const { classes } = useStyles();
    const router = useRouter();

    const handleOpenCategory = () => router.push({ pathname: "/articles/[categoryId]", query: { categoryId: String(data.id) } });

    return (
        <Flex {...props} className={classes.root}>
            <ThemeIcon color="secondary" sx={{ height: 48, width: 48, borderRadius: 56 }}>
                <IconBook2 />
            </ThemeIcon>
            <Flex direction="column" gap={2} sx={{ flex: 1 }}>
                <Title order={3} color="dark" lineClamp={1}>
                    {data.name}
                </Title>
                <Text className={classes.countArticles}>{`${data.articlesCount} ${getPluralString(
                    data.articlesCount,
                    "статья",
                    "статьи",
                    "статей"
                )}`}</Text>
            </Flex>
            <ActionIcon className={classes.actionIcon} onClick={handleOpenCategory}>
                <IconArrowNarrowRight />
            </ActionIcon>
        </Flex>
    );
});

export default MemoizedArticleCategoryItem;
