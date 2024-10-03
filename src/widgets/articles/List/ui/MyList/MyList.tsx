import { Box, Flex, FlexProps } from "@mantine/core";
import { useRouter } from "next/router";
import { List as ListComponent } from "@components/List";
import { ArticleAndArticleCategoryFiltersForm, ArticleFromList, useMyArticles } from "@entities/article";
import { Button, EmptyData, Loader, Paragraph } from "@shared/ui";
import { Card as ArticleCard, Rating as ArticleRating, FavoriteButton } from "@features/articles";
import { getPluralString } from "@shared/utils";
import { ArticleTypes } from "@shared/constant";
import { useMe } from "@entities/auth";
import { initialParams } from "./constants";
import { adaptGetMyArticlesRequest } from "./utils";
import useStyles from "./MyList.styles";

export interface MyListProps extends FlexProps {
    filterParams?: ArticleAndArticleCategoryFiltersForm;
}

const MyList = ({ filterParams, ...props }: MyListProps) => {
    const { classes, cx } = useStyles();
    const router = useRouter();
    const { data: user } = useMe();

    const {
        data: articlesData,
        isFetching,
        isLoading,
        hasNextPage,
        fetchNextPage,
    } = useMyArticles(adaptGetMyArticlesRequest({ ...initialParams, ...filterParams, userId: user?.id }));

    const handleClickShowMore = () => hasNextPage && fetchNextPage();

    const handleClickCard = (article: ArticleFromList) => router.push({ pathname: "/articles/my/[id]", query: { id: String(article.id) } });

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
                                <FavoriteButton {...props} variant="compact" articleType={ArticleTypes.MY_ARTICLE} />
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
            <Box>
                <Paragraph variant="text-small-m" component="span" color="gray45">
                    {"Всего: "}
                </Paragraph>
                <Paragraph variant="text-small-m" component="span">
                    {`${articlesData.pagination.total} ${getPluralString(articlesData.pagination.total, "статья", "статьи", "статей")}`}
                </Paragraph>
            </Box>
        </Flex>
    );
};

export default MyList;
