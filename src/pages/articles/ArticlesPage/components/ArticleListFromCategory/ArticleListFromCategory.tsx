import { Flex } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { Button } from "@shared/ui";
import { CarouselList as ArticlePackageCarouselList } from "@widgets/articlePackages";
import { ArticleAndArticleCategoryFiltersForm } from "@entities/article";
import { List as ArticleList } from "@widgets/articles";

export interface ArticleListFromCategoryProps {
    filterParams?: ArticleAndArticleCategoryFiltersForm;
    onBackList: () => void;
}

const ArticleListFromCategory = ({ filterParams, onBackList }: ArticleListFromCategoryProps) => {
    return (
        <>
            <Flex direction="column" gap={32}>
                <Button variant="white" w="min-content" leftIcon={<IconArrowNarrowLeft />} onClick={onBackList}>
                    Все категории
                </Button>
                <ArticleList filterParams={filterParams} />
            </Flex>
            <ArticlePackageCarouselList />
        </>
    );
};

export default ArticleListFromCategory;
