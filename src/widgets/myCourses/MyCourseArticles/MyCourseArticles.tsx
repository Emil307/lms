import { Flex, FlexProps } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ArticleAndArticleCategoryFiltersForm } from "@entities/article";
import { List as ArticleList } from "@widgets/articles";
import { Filters } from "@features/articles";
import { TRouterQueries } from "@shared/types";
import { initialFilterValues } from "./constants";
import { adaptCourseArticleFiltersForm, prepareQueryParams } from "./utils";
import useStyles from "./MyCourseArticles.styles";

export interface MyCourseArticlesProps extends FlexProps {
    courseId: string;
}

const MyCourseArticles = ({ courseId, ...props }: MyCourseArticlesProps) => {
    const router = useRouter();
    const queryParams = router.query as TRouterQueries;
    const [filterParams, setFilterParams] = useState<ArticleAndArticleCategoryFiltersForm>(initialFilterValues);
    const { classes, cx } = useStyles();

    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        setFilterParams({ ...initialFilterValues, ...adaptCourseArticleFiltersForm(queryParams) });
    }, [router.isReady, queryParams]);

    const handleSubmitFilters = (values: ArticleAndArticleCategoryFiltersForm) => {
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, page: "1", ...prepareQueryParams(values) },
            },
            undefined,
            { shallow: true }
        );
    };

    return (
        <Flex {...props} className={cx(classes.root, props.className)}>
            <Filters data={filterParams} onSubmitFilters={handleSubmitFilters} articleType="by-course" courseId={courseId} />
            <Flex className={classes.wrapperContent}>
                <ArticleList.Main filterParams={{ ...filterParams, courseId }} />
            </Flex>
        </Flex>
    );
};

export default MyCourseArticles;
