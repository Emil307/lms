import { Flex, FlexProps } from "@mantine/core";
import { useEffect } from "react";
import { useIntersection } from "@mantine/hooks";
import { Carousel } from "@components/Carousel";
import { ArticlePackageFromList, useArticlePackages } from "@entities/articlePackage";
import { Card as ArticlePackageCard } from "@features/articlePackages";
import { CategoryListFromPackage } from "@widgets/admin/articlePackages";
import { Heading } from "@shared/ui";

export interface CarouselListProps extends Omit<FlexProps, "children"> {
    title?: string;
}

const CarouselList = ({ title = "Пакетные предложения", ...props }: CarouselListProps) => {
    const { data: articlePackages, hasNextPage, fetchNextPage } = useArticlePackages();

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    if (!articlePackages?.data) {
        return null;
    }

    return (
        <Flex {...props} direction="column" gap={32}>
            <Heading order={2}>{title}</Heading>
            <Carousel<ArticlePackageFromList> data={articlePackages.data} lastElemRef={lastElemRef} slideSize="100%">
                {(props) => (
                    <ArticlePackageCard {...props} mih={340} w="100%">
                        {(props) => <CategoryListFromPackage {...props} />}
                    </ArticlePackageCard>
                )}
            </Carousel>
        </Flex>
    );
};

export default CarouselList;
