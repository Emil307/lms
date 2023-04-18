import { Box, Flex, FlexProps, Grid, ScrollArea, Text } from "@mantine/core";
import { List } from "@components/List";
import { Article, useArticles } from "@entities/article";
import { Button } from "@shared/ui";
import { ArticleItem } from "./components";
import useStyles from "./ArticleListFromCategory.styles";

export interface ArticleListFromCategoryProps extends FlexProps {
    onClose: () => void;
}

const ArticleListFromCategory = ({ onClose, ...props }: ArticleListFromCategoryProps) => {
    const { classes } = useStyles();
    const { data: articlesData } = useArticles();

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
                        <List<Article>
                            data={articlesData?.data}
                            m={0}
                            colProps={{ p: 0, py: 2, pr: 12 }}
                            renderItem={(props) => <ArticleItem {...props} />}
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
