import { Flex, FlexProps } from "@mantine/core";
import { useRouter } from "next/router";
import { List as ListComponent } from "@components/List";
import { ArticleAndArticleCategoryFiltersForm, ArticleFromList, useMyArticles } from "@entities/article";
import { Button } from "@shared/ui";
import { Card as ArticleCard } from "@features/articles";
import { initialParams } from "./constants";
import { adaptGetMyArticlesRequest } from "./utils";
import useStyles from "./MyList.styles";

export interface MyListProps extends FlexProps {
    filterParams?: ArticleAndArticleCategoryFiltersForm;
}

const MyList = ({ filterParams, ...props }: MyListProps) => {
    const { classes } = useStyles();
    const router = useRouter();

    const {
        data: articlesData,
        isFetching,
        hasNextPage,
        fetchNextPage,
    } = useMyArticles(adaptGetMyArticlesRequest({ ...initialParams, ...filterParams }));

    const handleClickShowMore = () => hasNextPage && fetchNextPage();

    const handleClickCard = (article: ArticleFromList) => router.push({ pathname: "/articles/my/[id]", query: { id: String(article.id) } });

    return (
        <Flex {...props} direction="column" gap={32}>
            <ListComponent<ArticleFromList>
                data={articlesData?.data}
                m={0}
                colProps={{ p: 0, py: 4 }}
                renderItem={(props) => <ArticleCard {...props} onClick={handleClickCard} />}
            />
            {hasNextPage && (
                <Button className={classes.buttonLoadMore} variant="white" onClick={handleClickShowMore} loading={isFetching}>
                    Показать еще статьи
                </Button>
            )}
        </Flex>
    );
};

export default MyList;
