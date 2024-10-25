import { Box, Flex, FlexProps } from "@mantine/core";
import { List } from "@components/List";
import { ArticleAndArticleCategoryFiltersForm, ArticleCategoryFromList, useArticleCategories } from "@entities/article";
import { Button, EmptyData, Loader, Paragraph } from "@shared/ui";
import { getPluralString } from "@shared/utils";
import { ArticleCategoryItem } from "./components";
import { adaptGetArticleCategoriesRequest } from "./utils";
import { initialParams } from "./constants";
import useStyles from "./ArticleCategoryList.styles";

export interface ArticleCategoryListProps extends FlexProps {
    filterParams?: ArticleAndArticleCategoryFiltersForm;
}

const ArticleCategoryList = ({ filterParams, ...props }: ArticleCategoryListProps) => {
    const { classes, cx } = useStyles();

    const {
        data: articleCategoriesData,
        isFetching,
        isLoading,
        hasNextPage,
        fetchNextPage,
    } = useArticleCategories(adaptGetArticleCategoriesRequest({ ...initialParams, ...filterParams }));

    const handleClickShowMore = () => hasNextPage && fetchNextPage();

    if (isLoading) {
        return <Loader sx={{ alignSelf: "center" }} />;
    }

    if (!articleCategoriesData?.data.length) {
        return <EmptyData title="Такого пока нет. Попробуете изменить запрос." />;
    }

    return (
        <Flex {...props} className={cx(classes.root, props.className)}>
            <List<ArticleCategoryFromList>
                data={articleCategoriesData.data}
                m={0}
                colProps={{ p: 0, py: 4 }}
                renderItem={(props) => <ArticleCategoryItem {...props} />}
            />
            {hasNextPage && (
                <Button className={classes.buttonLoadMore} variant="white" onClick={handleClickShowMore} loading={isFetching}>
                    Показать еще
                </Button>
            )}
            {articleCategoriesData.meta && (
                <Box>
                    <Paragraph variant="text-small-m" component="span" color="neutralMain50">
                        {"Всего: "}
                    </Paragraph>
                    <Paragraph variant="text-small-m" component="span">
                        {`${articleCategoriesData.meta.articlesCount} ${getPluralString(
                            articleCategoriesData.meta.articlesCount,
                            "статья",
                            "статьи",
                            "статей",
                        )}`}
                    </Paragraph>
                </Box>
            )}
        </Flex>
    );
};

export default ArticleCategoryList;
