import { Flex, FlexProps } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { CarouselList as ArticlePackageCarouselList } from "@widgets/articlePackages";
import { ArticleAndArticleCategoryFiltersForm, ArticleFromList } from "@entities/article";
import { List as ArticleList } from "@widgets/articles";
import { Filters, FiltersProps } from "@features/articles";
import useStyles from "./ArticlesFromCategory.styles";

export interface ArticlesFromCategoryProps extends FlexProps, Pick<FiltersProps, "onSubmitFilters"> {
    filterParams?: ArticleAndArticleCategoryFiltersForm;
    onBackList: () => void;
}

const ArticlesFromCategory = ({ filterParams, onSubmitFilters, onBackList, ...props }: ArticlesFromCategoryProps) => {
    const router = useRouter();
    const { classes, cx } = useStyles();

    const openArticle = (article: ArticleFromList) =>
        router.push({
            pathname: "/articles/by-category/[categoryId]/article/[id]",
            query: { id: String(article.id), categoryId: article.category?.id?.toString() ?? "null" },
        });

    return (
        <Flex {...props} className={cx(classes.root, props.className)}>
            <Filters data={filterParams} onSubmitFilters={onSubmitFilters} />
            <Flex className={classes.wrapperContent}>
                <Flex direction="column" gap={32}>
                    <Button variant="white" w="min-content" leftIcon={<IconArrowNarrowLeft />} onClick={onBackList}>
                        Все категории
                    </Button>
                    <ArticleList.Main filterParams={filterParams} onClickCard={openArticle} />
                </Flex>
                <ArticlePackageCarouselList />
            </Flex>
        </Flex>
    );
};

export default ArticlesFromCategory;
