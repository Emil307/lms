import { Box, Flex } from "@mantine/core";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { ArticleMeta } from "@entities/article";
import { ArticleTypes } from "@shared/constant";

export interface PaginationProps {
    meta: ArticleMeta;
    type: Exclude<ArticleTypes, ArticleTypes.BY_COURSE>;
}

const Pagination = ({ meta, type }: PaginationProps) => {
    const router = useRouter();

    const handleRedirectArticle = (articleId: number) => {
        switch (type) {
            case ArticleTypes.BY_CATEGORY:
                return router.push({
                    pathname: "/articles/by-category/[categoryId]/article/[id]",
                    query: { id: articleId.toString(), categoryId: String(router.query.categoryId) },
                });

            case ArticleTypes.MY_ARTICLE:
                return router.push({
                    pathname: "/articles/my/[id]",
                    query: { id: articleId.toString() },
                });
            case ArticleTypes.FAVORITE:
                return router.push({ pathname: "/articles/favorite/[id]", query: { id: articleId.toString() } });
        }
    };

    const handlePrevArticle = () => {
        if (meta.prev) {
            handleRedirectArticle(meta.prev);
        }
    };

    const handleNextArticle = () => {
        if (meta.next) {
            handleRedirectArticle(meta.next);
        }
    };

    if (!meta.next && !meta.prev) {
        return null;
    }

    return (
        <Flex justify="space-between">
            <Box>
                {meta.prev && (
                    <Button variant="text" leftIcon={<ArrowLeftCircle />} onClick={handlePrevArticle}>
                        Назад
                    </Button>
                )}
            </Box>
            <Box>
                {meta.next && (
                    <Button variant="text" rightIcon={<ArrowRightCircle />} onClick={handleNextArticle}>
                        Вперед
                    </Button>
                )}
            </Box>
        </Flex>
    );
};

export default Pagination;
