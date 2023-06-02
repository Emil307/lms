import { Flex } from "@mantine/core";
import { List } from "@components/List";
import { ArticleCategoryFromList, useArticleCategories } from "@entities/article";
import { Button } from "@shared/ui";
import { ArticleCategoryItem } from "./components";
import useStyles from "./ArticleCategoryList.styles";

export interface ArticleCategoryListProps {}

const ArticleCategoryList = (_props: ArticleCategoryListProps) => {
    const { classes } = useStyles();

    const { data: articleCategoriesData, isFetching, hasNextPage, fetchNextPage } = useArticleCategories({});

    const handleClickShowMore = () => hasNextPage && fetchNextPage();

    return (
        <Flex direction="column" gap={32}>
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
        </Flex>
    );
};

export default ArticleCategoryList;
