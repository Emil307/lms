import { Card as MCard, Button, Text, Flex } from "@mantine/core";
import { memo } from "react";
import { CourseDiscount } from "@entities/coursePackage";
import { getDiscountedAmount } from "@shared/utils";
import useStyles from "./AmountInfo.styles";

export interface AmountInfoProps {
    data: {
        isDiscount: boolean;
        discount?: CourseDiscount;
        price: number;
    };
}

const MemoizedAmountInfo = memo(function AmountInfo({ data }: AmountInfoProps) {
    const { classes } = useStyles();

    const renderAmount = () => {
        if (data.isDiscount && data.discount?.value) {
            return (
                <Flex sx={{ gap: 6 }}>
                    <Text className={classes.price}>{`${getDiscountedAmount(data.price, data.discount.value).toLocaleString(
                        "ru"
                    )} ₽`}</Text>
                    <Text className={classes.priceWithoutDiscount}>{`${data.price.toLocaleString("ru")} ₽`}</Text>
                </Flex>
            );
        }
        return <Text className={classes.price}>{`${data.price.toLocaleString("ru")} ₽`}</Text>;
    };

    return (
        <MCard.Section className={classes.root}>
            <Button>Подробнее</Button>
            <Flex direction="column" gap={6}>
                <Text
                    sx={(theme) => ({
                        fontWeight: 500,
                        fontSize: 14,
                        lineHeight: "16px",
                        color: theme.colors.dark[0],
                    })}>
                    Стоимость пакета
                </Text>
                <> {renderAmount}</>
            </Flex>
        </MCard.Section>
    );
});

export default MemoizedAmountInfo;
