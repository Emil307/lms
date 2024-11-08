import { Flex, FlexProps } from "@mantine/core";
import { useEffect } from "react";
import { Carousel } from "@components/Carousel";
import { ArticlePackageFromList, useArticlePackages } from "@entities/articlePackage";
import { Card as ArticlePackageCard } from "@features/articlePackages";
import { CategoryListFromPackage } from "@widgets/admin/articlePackages";
import { Heading } from "@shared/ui";
import { useIntersection } from "@shared/utils";
import { useMe } from "@entities/auth";
import { adaptGetArticlePackagesRequest } from "./utils";
import { initialParams } from "./constants";

export interface CarouselListProps extends Omit<FlexProps, "children"> {
    title?: string;
    courseId?: number;
}

const CarouselList = ({ title = "Пакетные предложения", courseId, ...props }: CarouselListProps) => {
    const { data: user } = useMe();

    const {
        data: articlePackages,
        hasNextPage,
        fetchNextPage,
    } = useArticlePackages(adaptGetArticlePackagesRequest({ ...initialParams, courseIds: courseId, userId: user?.id }));

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    if (!articlePackages?.data.length) {
        return null;
    }

    return (
        <Flex {...props} direction="column" gap={32}>
            <Heading order={2}>{title}</Heading>
            <Carousel<ArticlePackageFromList>
                data={articlePackages.data}
                lastElemRef={lastElemRef}
                breakpoints={[
                    { maxWidth: "md", slideSize: "100%" },
                    { minWidth: "md", slideSize: "50%" },
                ]}>
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
