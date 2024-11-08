import { Text, Flex } from "@mantine/core";
import { getPluralString, hasDiscount } from "@shared/utils";
import IconStarFour from "public/icons/starFour.svg";
import { Button, Heading, Paragraph } from "@shared/ui";
import { ArticlePackageFromList } from "@entities/articlePackage";
import { useAuthPay } from "@app/utils";
import useStyles from "./Footer.styles";

export interface FooterProps {
    data: ArticlePackageFromList;
}

const Footer = ({ data }: FooterProps) => {
    const { classes } = useStyles({ hasDiscount: !!data.discount });

    const { handleBuyEntity, isLoading } = useAuthPay({
        entityId: data.id,
        entityName: data.name,
        entityType: "articlePackage",
        entityPrice: data.discountPrice,
    });

    const renderAmount = () => {
        const { discountPrice, fullPrice, discount } = data;

        if (hasDiscount({ discount, defaultPrice: fullPrice, discountPrice })) {
            return (
                <Flex align="center" sx={{ gap: 6 }}>
                    <Heading order={3} className={classes.price}>{`${discountPrice.toLocaleString("ru")} ₽`}</Heading>
                    <Text className={classes.priceWithoutDiscount}>{`${fullPrice.toLocaleString("ru")} ₽`}</Text>
                </Flex>
            );
        }
        return <Heading order={3} className={classes.price}>{`${fullPrice.toLocaleString("ru")} ₽`}</Heading>;
    };

    return (
        <Flex className={classes.root}>
            <Flex direction="column" gap={6}>
                <Flex gap={8}>
                    <IconStarFour />
                    <Paragraph variant="text-small-b">{`${data.articlesCount} ${getPluralString(
                        data.articlesCount,
                        "статья",
                        "статьи",
                        "статей"
                    )}`}</Paragraph>
                </Flex>
                {renderAmount()}
            </Flex>
            <Button onClick={handleBuyEntity} loading={isLoading} w="min-content">
                Получить доступ
            </Button>
        </Flex>
    );
};

export default Footer;
