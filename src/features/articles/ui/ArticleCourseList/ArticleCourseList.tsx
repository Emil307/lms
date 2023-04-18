import { Flex } from "@mantine/core";
import { List } from "@components/List";
import { ArticleCourse, useArticleCourses } from "@entities/article";
import { Button } from "@shared/ui";
import { ArticleCourseItem } from "./components";
import useStyles from "./ArticleCourseList.styles";

export interface ArticleCourseListProps {}

const ArticleCourseList = (_props: ArticleCourseListProps) => {
    const { classes } = useStyles();

    const { data: articleCoursesData, isFetching, hasNextPage, fetchNextPage } = useArticleCourses();

    const handleClickShowMore = () => hasNextPage && fetchNextPage();

    return (
        <Flex direction="column" gap={32}>
            <List<ArticleCourse>
                data={articleCoursesData?.data}
                m={0}
                colProps={{ p: 0, py: 4 }}
                renderItem={(props) => <ArticleCourseItem {...props} />}
            />
            {hasNextPage && (
                <Button className={classes.buttonLoadMore} variant="white" onClick={handleClickShowMore} loading={isFetching}>
                    Показать еще курсы
                </Button>
            )}
        </Flex>
    );
};

export default ArticleCourseList;
