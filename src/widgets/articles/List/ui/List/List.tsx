import { Box, Flex, FlexProps } from "@mantine/core";
import { List as ListComponent } from "@components/List";
import { ArticleAndArticleCategoryFiltersForm, ArticleFromList, useArticles } from "@entities/article";
import { Button, EmptyData, Loader, Paragraph } from "@shared/ui";
import { Card as ArticleCard, Rating as ArticleRating, FavoriteButton } from "@features/articles";
import { getPluralString } from "@shared/utils";
import { ArticleTypes } from "@shared/constant";
import { adaptGetArticlesRequest } from "./utils";
import { initialParams } from "./constants";
import useStyles from "./List.styles";

export interface ListProps extends FlexProps {
    filterParams?: ArticleAndArticleCategoryFiltersForm;
    onClickCard?: (article: ArticleFromList) => void;
}

const List = ({ filterParams, onClickCard, ...props }: ListProps) => {
    const { classes, cx } = useStyles();

    const articleType = filterParams?.categoryId ? ArticleTypes.BY_CATEGORY : undefined;

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
                        onClick={onClickCard}
                        actionSlot={
                            <>
                                <ArticleRating {...props} />
                                <FavoriteButton
                                    {...props}
                                    variant="compact"
                                    articleType={articleType}
                                    categoryId={filterParams?.categoryId}
                                />
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

export default List;
