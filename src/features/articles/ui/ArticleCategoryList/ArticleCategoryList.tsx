import { Flex, FlexProps, Loader } from "@mantine/core";
import { List } from "@components/List";
import { ArticleAndArticleCategoryFiltersForm, ArticleCategoryFromList, useArticleCategories } from "@entities/article";
import { Button, EmptyData } from "@shared/ui";
import { ArticleCategoryItem } from "./components";
import { adaptGetArticleCategoriesRequest } from "./utils";
import { initialParams } from "./constants";
import useStyles from "./ArticleCategoryList.styles";

export interface ArticleCategoryListProps extends FlexProps {
    filterParams?: ArticleAndArticleCategoryFiltersForm;
}

const ArticleCategoryList = ({ filterParams, ...props }: ArticleCategoryListProps) => {
    const { classes } = useStyles();

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
        return <EmptyData title="Такого пока нет. Попробуете изменить запрос?" />;
    }

    return (
        <Flex {...props} direction="column" gap={32}>
            <List<ArticleCategoryFromList>
                data={articleCategoriesData?.data}
                m={0}
                colProps={{ p: 0, py: 4 }}
                renderItem={(props) => <ArticleCategoryItem {...props} />}
            />
            {hasNextPage && (
                <Button className={classes.buttonLoadMore} variant="white" onClick={handleClickShowMore} loading={isFetching}>
                    Показать еще категории
                </Button>
            )}
            {/* TODO: Добавить кол-во статей как бек добавит это */}
        </Flex>
    );
};

export default ArticleCategoryList;
