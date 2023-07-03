import { Flex, FlexProps } from "@mantine/core";
import { useRouter } from "next/router";
import { ArticleAndArticleCategoryFiltersForm, ArticleFromList } from "@entities/article";
import { CarouselList as ArticlePackageCarouselList } from "@widgets/articlePackages";
import { ArticleCategoryList, Filters, FiltersProps } from "@features/articles";
import { List as ArticleList } from "@widgets/articles";

export interface ArticleCategoriesProps extends FlexProps, Pick<FiltersProps, "onSubmitFilters"> {
    filterParams?: ArticleAndArticleCategoryFiltersForm;
}

const ArticleCategories = ({ filterParams, onSubmitFilters, ...props }: ArticleCategoriesProps) => {
    const router = useRouter();

    const openArticle = (article: ArticleFromList) =>
        router.push({
            pathname: "/articles/by-category/[categoryId]/article/[id]",
            query: { id: String(article.id), categoryId: String(article.category?.id) },
        });

    const renderList = () => {
        if (filterParams?.query) {
            return <ArticleList.Main filterParams={filterParams} onClickCard={openArticle} />;
        }
        return <ArticleCategoryList filterParams={filterParams} />;
    };

    return (
        <Flex gap={32} {...props}>
            <Filters data={filterParams} onSubmitFilters={onSubmitFilters} w={264} />
            <Flex direction="column" gap={64} sx={{ flex: 1 }}>
                {renderList()}
                <ArticlePackageCarouselList />
            </Flex>
        </Flex>
    );
};

export default ArticleCategories;
