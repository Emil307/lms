import { Flex, Text } from "@mantine/core";
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
            <Flex align="center" gap={6}>
                <Heading order={3} className={classes.price}>{`${data.discountPrice} ₽`}</Heading>
                <Text className={classes.priceWithoutDiscount}>{`${data.price} ₽`}</Text>
            </Flex>
        );
    }
    return <Heading order={3} className={classes.price}>{`${data.price} ₽`}</Heading>;
};

export default AmountInfo;
