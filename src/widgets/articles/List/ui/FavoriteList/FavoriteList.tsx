import { Box, Flex, FlexProps } from "@mantine/core";
import { useRouter } from "next/router";
import { List as ListComponent } from "@components/List";
import { ArticleAndArticleCategoryFiltersForm, ArticleFromList, useFavoriteArticles } from "@entities/article";
import { Button, EmptyData, Loader, Paragraph } from "@shared/ui";
import { Card as ArticleCard, Rating as ArticleRating, FavoriteButton } from "@features/articles";
import { getPluralString } from "@shared/utils";
import { ArticleTypes } from "@shared/constant";
import { initialParams } from "./constants";
import { adaptGetFavoriteArticlesRequest } from "./utils";
import useStyles from "./FavoriteList.styles";

export interface FavoriteListProps extends FlexProps {
    filterParams?: ArticleAndArticleCategoryFiltersForm;
}

const FavoriteList = ({ filterParams, ...props }: FavoriteListProps) => {
    const { classes, cx } = useStyles();
    const router = useRouter();

    const {
        data: articlesData,
        isFetching,
        isLoading,
        hasNextPage,
        fetchNextPage,
    } = useFavoriteArticles(adaptGetFavoriteArticlesRequest({ ...initialParams, ...filterParams }));

    const handleClickShowMore = () => hasNextPage && fetchNextPage();

    const handleClickCard = (article: ArticleFromList) =>
        router.push({ pathname: "/articles/favorite/[id]", query: { id: String(article.id) } });

    if (isLoading) {
        return <Loader sx={{ alignSelf: "center" }} />;
    }

    if (!articlesData?.data.length) {
        return (
            <EmptyData
                title="К сожалению, совпадений не найдено"
                description="Попробуйте поискать в других категориях или изменить параметры. Чтобы вернуться ко всему списку, сбросьте фильтр."
            />
        );
    }

    return (
        <Flex {...props} className={cx(classes.root, props.className)}>
            <ListComponent<ArticleFromList>
                data={articlesData.data}
                m={0}
                colProps={{ p: 0, py: 4 }}
                renderItem={(props) => (
                    <ArticleCard
                        {...props}
                        onClick={handleClickCard}
                        actionSlot={
                            <>
                                <ArticleRating {...props} />
                                <FavoriteButton {...props} variant="compact" articleType={ArticleTypes.FAVORITE} />
                            </>
                        }
                    />
                )}
            />
            {hasNextPage && (
                <Button className={classes.buttonLoadMore} variant="white" onClick={handleClickShowMore} loading={isFetching}>
                    Показать еще
                </Button>
            )}
            <Box>
                <Paragraph variant="text-small-m" component="span" color="neutralMain50">
                    {"Всего: "}
                </Paragraph>
                <Paragraph variant="text-small-m" component="span">
                    {`${articlesData.pagination.total} ${getPluralString(articlesData.pagination.total, "статья", "статьи", "статей")}`}
                </Paragraph>
            </Box>
        </Flex>
    );
};

export default FavoriteList;
