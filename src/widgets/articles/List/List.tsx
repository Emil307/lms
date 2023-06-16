import { Flex, FlexProps } from "@mantine/core";
import { List as ListComponent } from "@components/List";
import { ArticleAndArticleCategoryFiltersForm, ArticleFromList, useArticles } from "@entities/article";
import { Button, Loader } from "@shared/ui";
import { Card as ArticleCard, Rating as ArticleRating, FavoriteButton } from "@features/articles";
import { adaptGetArticlesRequest } from "./utils";
import { initialParams } from "./constants";
import useStyles from "./List.styles";

export interface ListProps extends FlexProps {
    filterParams?: ArticleAndArticleCategoryFiltersForm;
}

const List = ({ filterParams, ...props }: ListProps) => {
    const { classes } = useStyles();

    const {
        data: articlesData,
        isFetching,
        isLoading,
        hasNextPage,
        fetchNextPage,
    } = useArticles(adaptGetArticlesRequest({ ...initialParams, ...filterParams }));

    const handleClickShowMore = () => hasNextPage && fetchNextPage();

    if (isLoading) {
        return <Loader sx={{ alignSelf: "center" }} />;
    }

    return (
        <Flex {...props} direction="column" gap={32}>
            <ListComponent<ArticleFromList>
                data={articlesData?.data}
                m={0}
                colProps={{ p: 0, py: 4 }}
                renderItem={(props) => (
                    <ArticleCard
                        {...props}
                        actionSlot={
                            <>
                                <ArticleRating {...props} />
                                <FavoriteButton {...props} variant="compact" />
                            </>
                        }
                    />
                )}
            />
            {hasNextPage && (
                <Button className={classes.buttonLoadMore} variant="white" onClick={handleClickShowMore} loading={isFetching}>
                    Показать еще статьи
                </Button>
            )}
        </Flex>
    );
};

export default List;
