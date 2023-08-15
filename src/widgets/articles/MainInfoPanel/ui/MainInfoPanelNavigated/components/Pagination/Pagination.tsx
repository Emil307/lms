import { Box, Flex } from "@mantine/core";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { ArticleMeta } from "@entities/article";

export interface PaginationProps {
    meta: ArticleMeta;
    type: "favorite" | "my-articles" | "by-category";
}

const Pagination = ({ meta, type }: PaginationProps) => {
    const router = useRouter();

    const handleRedirectArticle = (articleId: number) => {
        switch (type) {
            case "by-category":
                return router.push({
                    pathname: "/articles/by-category/[categoryId]/article/[id]",
                    query: { id: articleId.toString(), categoryId: String(router.query.categoryId) },
                });

            case "my-articles":
                return router.push({
                    pathname: "/articles/my/[id]",
                    query: { id: articleId.toString() },
                });
            case "favorite":
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
