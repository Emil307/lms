import { Flex } from "@mantine/core";
import { List } from "@components/List";
import { Article, useArticles } from "@entities/article";
import { Button } from "@shared/ui";
import { ArticleItem } from "./components";
import useStyles from "./ArticleList.styles";

export interface ArticleListProps {}

const ArticleList = (_props: ArticleListProps) => {
    const { classes } = useStyles();

    const { data: articlesData, isFetching, hasNextPage, fetchNextPage } = useArticles();

    const handleClickShowMore = () => hasNextPage && fetchNextPage();

    return (
        <Flex direction="column" gap={32}>
            <List<Article> data={articlesData?.data} m={0} colProps={{ p: 0, py: 4 }} renderItem={(props) => <ArticleItem {...props} />} />
            {hasNextPage && (
                <Button className={classes.buttonLoadMore} variant="white" onClick={handleClickShowMore} loading={isFetching}>
                    Показать еще статьи
                </Button>
            )}
        </Flex>
    );
};

export default ArticleList;
