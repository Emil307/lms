import { Group, Text } from "@mantine/core";
import { Course } from "@entities/course";
import { getDiscountedAmounts } from "@features/courses";
import useStyles from "./AmountInfo.styles";

export interface AmountInfoProps {
    data: Pick<Course, "discount" | "isDiscount" | "price">;
}

const AmountInfo = ({ data }: AmountInfoProps) => {
    const { classes } = useStyles();

    if (data.isDiscount && data.discount.data.value) {
        return (
            <Group sx={{ gap: 6 }}>
                <Text className={classes.price}>{`${getDiscountedAmounts(data.price, data.discount.data.value)} ₽`}</Text>
                <Text className={classes.priceWithoutDiscount}>{`${data.price} ₽`}</Text>
            </Group>
        );
    }
    return <Text className={classes.price}>{`${data.price} ₽`}</Text>;
};

export default AmountInfo;
