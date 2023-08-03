import { Flex, FlexProps } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ArticleAndArticleCategoryFiltersForm } from "@entities/article";
import { List as ArticleList } from "@widgets/articles";
import { Filters } from "@features/articles";
import { TRouterQueries } from "@shared/types";
import { initialFilterValues } from "./constants";
import { adaptCourseArticleFiltersForm, prepareQueryParams } from "./utils";

export interface MyCourseArticlesProps extends FlexProps {
    courseId: string;
}

const MyCourseArticles = ({ courseId, ...props }: MyCourseArticlesProps) => {
    const router = useRouter();
    const [filterParams, setFilterParams] = useState<ArticleAndArticleCategoryFiltersForm>(initialFilterValues);
    const queryParams = router.query as TRouterQueries;

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
        <Flex gap={32} {...props}>
            <Filters data={filterParams} onSubmitFilters={handleSubmitFilters} w={264} articleType="by-course" courseId={courseId} />
            <Flex direction="column" gap={64} sx={{ flex: 1 }}>
                <ArticleList.Main filterParams={{ ...filterParams, courseId }} />
            </Flex>
        </Flex>
    );
};

export default MyCourseArticles;
