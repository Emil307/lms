import { Flex, FlexProps } from "@mantine/core";
import { ArticleAndArticleCategoryFiltersForm } from "@entities/article";
import { List as ArticleList } from "@widgets/articles";
import { Filters, FiltersProps } from "@features/articles";
import { ArticleTypes } from "@shared/constant";
import useStyles from "./MyArticles.styles";

export interface MyArticlesProps extends FlexProps, Pick<FiltersProps, "onSubmitFilters"> {
    filterParams?: ArticleAndArticleCategoryFiltersForm;
}

const MyArticles = ({ filterParams, onSubmitFilters, ...props }: MyArticlesProps) => {
    const { classes, cx } = useStyles();
    return (
        <Flex {...props} className={cx(classes.root, props.className)}>
            <Filters data={filterParams} onSubmitFilters={onSubmitFilters} articleType={ArticleTypes.MY_ARTICLE} />
            <Flex className={classes.wrapperContent}>
                <ArticleList.My filterParams={filterParams} />
            </Flex>
        </Flex>
    );
};

export default MyArticles;
