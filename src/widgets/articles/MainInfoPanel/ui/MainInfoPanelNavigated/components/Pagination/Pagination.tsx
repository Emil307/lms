import { Box, Flex } from "@mantine/core";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { ArticleMeta } from "@entities/article";

export interface PaginationProps {
    meta: ArticleMeta;
}

const Pagination = ({ meta }: PaginationProps) => {
    const router = useRouter();

    const handlePrevArticle = () => {
        if (meta.prev) {
            router.push({ pathname: "/articles/favorite/[id]", query: { id: meta.prev.toString() } });
        }
    };

    const handleNextArticle = () => {
        if (meta.next) {
            router.push({ pathname: "/articles/favorite/[id]", query: { id: meta.next.toString() } });
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
