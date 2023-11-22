import { Flex, FlexProps } from "@mantine/core";
import { ArticleAndArticleCategoryFiltersForm } from "@entities/article";
import { List as ArticleList } from "@widgets/articles";
import { Filters, FiltersProps } from "@features/articles";
import { ArticleTypes } from "@shared/constant";
import useStyles from "./FavoriteArticles.styles";

export interface FavoriteArticlesProps extends FlexProps, Pick<FiltersProps, "onSubmitFilters"> {
    filterParams?: ArticleAndArticleCategoryFiltersForm;
}

const FavoriteArticles = ({ filterParams, onSubmitFilters, ...props }: FavoriteArticlesProps) => {
    const { classes, cx } = useStyles();
    return (
        <Flex {...props} className={cx(classes.root, props.className)}>
            <Filters data={filterParams} onSubmitFilters={onSubmitFilters} articleType={ArticleTypes.FAVORITE} />
            <Flex className={classes.wrapperContent}>
                <ArticleList.Favorite filterParams={filterParams} />
            </Flex>
        </Flex>
    );
};

export default FavoriteArticles;
