import { Group, Text } from "@mantine/core";
import { Course } from "@entities/course";
import useStyles from "./AmountInfo.styles";

export interface AmountInfoProps {
    data: Pick<Course, "discountPrice" | "price" | "discount">;
}

const AmountInfo = ({ data }: AmountInfoProps) => {
    const { classes } = useStyles({ hasDiscount: !!data.discount });

    if (data.discount) {
        return (
            <Group sx={{ gap: 6 }}>
                <Text className={classes.price}>{`${data.discountPrice} ₽`}</Text>
                <Text className={classes.priceWithoutDiscount}>{`${data.price} ₽`}</Text>
            </Group>
        );
    }
    return <Text className={classes.price}>{`${data.price} ₽`}</Text>;
};

export default AmountInfo;
