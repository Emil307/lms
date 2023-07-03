import { Flex, FlexProps } from "@mantine/core";
import { ArticleAndArticleCategoryFiltersForm } from "@entities/article";
import { List as ArticleList } from "@widgets/articles";
import { Filters, FiltersProps } from "@features/articles";

export interface MyArticlesProps extends FlexProps, Pick<FiltersProps, "onSubmitFilters"> {
    filterParams?: ArticleAndArticleCategoryFiltersForm;
}

const MyArticles = ({ filterParams, onSubmitFilters, ...props }: MyArticlesProps) => {
    return (
        <Flex gap={32} {...props}>
            <Filters data={filterParams} onSubmitFilters={onSubmitFilters} w={264} articleType="my-articles" />
            <Flex direction="column" gap={64} sx={{ flex: 1 }}>
                <ArticleList.My filterParams={filterParams} />
            </Flex>
        </Flex>
    );
};

export default MyArticles;
