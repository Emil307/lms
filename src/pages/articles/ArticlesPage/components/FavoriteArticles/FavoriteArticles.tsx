import { Flex, FlexProps } from "@mantine/core";
import { ArticleAndArticleCategoryFiltersForm } from "@entities/article";
import { List as ArticleList } from "@widgets/articles";
import { Filters, FiltersProps } from "@features/articles";

export interface FavoriteArticlesProps extends FlexProps, Pick<FiltersProps, "onSubmitFilters"> {
    filterParams?: ArticleAndArticleCategoryFiltersForm;
}

const FavoriteArticles = ({ filterParams, onSubmitFilters, ...props }: FavoriteArticlesProps) => {
    return (
        <Flex gap={32} {...props}>
            <Filters data={filterParams} onSubmitFilters={onSubmitFilters} w={264} articleType="favorite" />
            <Flex direction="column" gap={64} sx={{ flex: 1 }}>
                <ArticleList.Favorite filterParams={filterParams} />
            </Flex>
        </Flex>
    );
};

export default FavoriteArticles;
