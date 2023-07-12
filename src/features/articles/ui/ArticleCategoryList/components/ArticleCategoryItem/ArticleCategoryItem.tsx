import { Flex, FlexProps, ThemeIcon, Text } from "@mantine/core";
import { memo } from "react";
import { IconArrowNarrowRight, IconBook2 } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { ArticleCategoryFromList } from "@entities/article";
import { getPluralString } from "@shared/utils";
import { Heading } from "@shared/ui";
import useStyles from "./ArticleCategoryItem.styles";

export interface ArticleCategoryItemProps extends FlexProps {
    data: ArticleCategoryFromList;
}

const MemoizedArticleCategoryItem = memo(function ArticleCategoryItem({ data, ...props }: ArticleCategoryItemProps) {
    const { classes } = useStyles();
    const router = useRouter();

    const handleOpenCategory = () => router.push({ pathname: "/articles", query: { ...router.query, categoryId: String(data.id) } });

    return (
        <Flex {...props} className={classes.root} onClick={handleOpenCategory}>
            <ThemeIcon color="secondary" sx={{ height: 48, width: 48, borderRadius: 56 }}>
                <IconBook2 />
            </ThemeIcon>
            <Flex direction="column" gap={2} sx={{ flex: 1 }}>
                <Heading order={3} lineClamp={1}>
                    {data.name}
                </Heading>
                <Text className={classes.countArticles}>{`${data.articlesCount} ${getPluralString(
                    data.articlesCount,
                    "статья",
                    "статьи",
                    "статей"
                )}`}</Text>
            </Flex>
            <ThemeIcon className={classes.arrowIcon}>
                <IconArrowNarrowRight />
            </ThemeIcon>
        </Flex>
    );
});

export default MemoizedArticleCategoryItem;
