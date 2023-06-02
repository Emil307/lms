import { Box, Flex, FlexProps, Grid, ScrollArea, Text } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { useEffect } from "react";
import { List } from "@components/List";
import { Button } from "@shared/ui";
import { ArticleFromList, useArticles } from "@entities/article";
import { ArticleItem } from "./components";
import useStyles from "./ArticleListFromCategory.styles";
import { adaptGetArticlesRequest } from "./utils";
import { initialValues } from "./constants";

export interface ArticleListFromCategoryProps extends FlexProps {
    articlePackageId?: number;
    categoryId?: number;
    onClose: () => void;
}

const ArticleListFromCategory = ({ categoryId, articlePackageId, onClose, ...props }: ArticleListFromCategoryProps) => {
    const { classes } = useStyles();

    const {
        data: articlesData,
        hasNextPage,
        fetchNextPage,
    } = useArticles(adaptGetArticlesRequest({ ...initialValues, categoryId, articlePackageIds: articlePackageId }));

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    return (
        <Flex {...props} direction="column" gap={24}>
            <Flex direction="column" gap={16}>
                <Text className={classes.titleList}>Статьи входящие в категорию:</Text>
                <Box className={classes.wrapperList}>
                    <ScrollArea
                        style={{ height: 304, position: "absolute", left: 24, right: 8 }}
                        type="auto"
                        offsetScrollbars
                        scrollbarSize={4}>
                        <List<ArticleFromList>
                            data={articlesData?.data}
                            m={0}
                            colProps={{ p: 0, py: 2, pr: 12 }}
                            renderItem={(props) => <ArticleItem {...props} />}
                            lastElemRef={lastElemRef}
                        />
                    </ScrollArea>
                </Box>
            </Flex>
            <Grid gutter={4}>
                <Grid.Col span={6}>
                    <Button variant="border" onClick={onClose} w="100%">
                        Закрыть
                    </Button>
                </Grid.Col>
            </Grid>
        </Flex>
    );
};

export default ArticleListFromCategory;
