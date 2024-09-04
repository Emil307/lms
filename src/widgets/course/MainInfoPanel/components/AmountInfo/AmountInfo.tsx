import { Flex, Text } from "@mantine/core";
import { CourseDetails } from "@entities/course";
import { Heading } from "@shared/ui";
import { hasDiscount } from "@shared/utils";
import useStyles from "./AmountInfo.styles";

export interface AmountInfoProps {
    data: CourseDetails;
}

const AmountInfo = ({ data }: AmountInfoProps) => {
    const { classes } = useStyles({ hasDiscount: !!data.discount && data.discountPrice !== data.price });

    if (hasDiscount({ discount: data.discount, defaultPrice: data.price, discountPrice: data.discountPrice })) {
        return (
            <Flex align="center" gap={12}>
                <Heading order={3} className={classes.price}>
                    {`${data.discountPrice.toLocaleString("ru")} ₽`}
                </Heading>
                <Text className={classes.priceWithoutDiscount}>{`${data.price.toLocaleString("ru")} ₽`}</Text>
            </Flex>
        );
    }
    return <Heading order={3} className={classes.price}>{`${data.price.toLocaleString("ru")} ₽`}</Heading>;
};

export default AmountInfo;
