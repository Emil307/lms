import { Flex, FlexProps } from "@mantine/core";
import { useRouter } from "next/router";
import { List as ListComponent } from "@components/List";
import { ArticleAndArticleCategoryFiltersForm, ArticleFromList, useFavoriteArticles } from "@entities/article";
import { Button } from "@shared/ui";
import { Card as ArticleCard } from "@features/articles";
import { initialParams } from "./constants";
import { adaptGetFavoriteArticlesRequest } from "./utils";
import useStyles from "./FavoriteList.styles";

export interface FavoriteListProps extends FlexProps {
    filterParams?: ArticleAndArticleCategoryFiltersForm;
}

const FavoriteList = ({ filterParams, ...props }: FavoriteListProps) => {
    const { classes } = useStyles();
    const router = useRouter();

    const {
        data: articlesData,
        isFetching,
        hasNextPage,
        fetchNextPage,
    } = useFavoriteArticles(adaptGetFavoriteArticlesRequest({ ...initialParams, ...filterParams }));

    const handleClickShowMore = () => hasNextPage && fetchNextPage();

    const handleClickCard = (article: ArticleFromList) =>
        router.push({ pathname: "/articles/favorite/[id]", query: { id: String(article.id) } });

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

export default FavoriteList;
