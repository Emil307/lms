import { Card as MCard, Text, Flex } from "@mantine/core";
import { Heading, Paragraph } from "@shared/ui";
import { CoursePackage } from "@entities/coursePackage";
import useStyles from "./AmountInfo.styles";

export interface AmountInfoProps {
    data: Pick<CoursePackage, "discount" | "discountPrice" | "price" | "id">;
}

const AmountInfo = ({ data }: AmountInfoProps) => {
    const hasDiscount = !!data.discount && data.discountPrice !== data.price;

    const { classes } = useStyles({ hasDiscount });
    const renderAmount = () => {
        if (hasDiscount) {
            return (
                <Flex align="center" sx={{ gap: 6 }}>
                    <Heading order={3} className={classes.price}>{`${data.discountPrice.toLocaleString("ru")} ₽`}</Heading>
                    <Text className={classes.priceWithoutDiscount}>{`${data.price.toLocaleString("ru")} ₽`}</Text>
                </Flex>
            );
        }
        return <Heading order={3} className={classes.price}>{`${data.price.toLocaleString("ru")} ₽`}</Heading>;
    };

    return (
        <MCard.Section className={classes.root}>
            <Flex direction="column" gap={hasDiscount ? 2 : 6}>
                <Paragraph variant="text-small-m">Стоимость пакета</Paragraph>
                {renderAmount()}
            </Flex>
        </MCard.Section>
    );
};

export default AmountInfo;
