import { Flex, FlexProps, ThemeIcon } from "@mantine/core";
import { memo } from "react";
import { IconArrowNarrowRight, IconBook2 } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { ArticleCategoryFromList } from "@entities/article";
import { getPluralString } from "@shared/utils";
import { Heading, Paragraph } from "@shared/ui";
import useStyles from "./ArticleCategoryItem.styles";

export interface ArticleCategoryItemProps extends FlexProps {
    data: ArticleCategoryFromList;
}

const MemoizedArticleCategoryItem = memo(function ArticleCategoryItem({ data, ...props }: ArticleCategoryItemProps) {
    const { classes, cx } = useStyles();
    const router = useRouter();

    const handleOpenCategory = () => router.push({ pathname: "/articles", query: { ...router.query, categoryId: String(data.id) } });

    return (
        <Flex {...props} className={cx(classes.root, props.className)} onClick={handleOpenCategory}>
            <ThemeIcon className={classes.wrapperIconBook}>
                <IconBook2 />
            </ThemeIcon>
            <Flex className={classes.textContainer}>
                <Heading order={3} lineClamp={1}>
                    {data.name}
                </Heading>
                <Paragraph variant="text-caption" color="gray45">{`${data.articlesCount} ${getPluralString(
                    data.articlesCount,
                    "статья",
                    "статьи",
                    "статей"
                )}`}</Paragraph>
            </Flex>
            <ThemeIcon className={classes.arrowIcon}>
                <IconArrowNarrowRight />
            </ThemeIcon>
        </Flex>
    );
});

export default MemoizedArticleCategoryItem;
