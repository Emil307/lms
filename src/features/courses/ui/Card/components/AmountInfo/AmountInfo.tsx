import { Group, Text } from "@mantine/core";
import { Course } from "@entities/course";
import { Heading } from "@shared/ui";
import useStyles from "./AmountInfo.styles";

export interface AmountInfoProps {
    data: Pick<Course, "discountPrice" | "price" | "discount">;
}

const AmountInfo = ({ data }: AmountInfoProps) => {
    const { classes } = useStyles({ hasDiscount: !!data.discount });

    if (data.discount) {
        return (
            <Group sx={{ gap: 6 }}>
                <Heading order={3} className={classes.price}>{`${data.discountPrice} ₽`}</Heading>
                <Text className={classes.priceWithoutDiscount}>{`${data.price} ₽`}</Text>
            </Group>
        );
    }
    return <Text className={classes.price}>{`${data.price} ₽`}</Text>;
};

export default AmountInfo;
