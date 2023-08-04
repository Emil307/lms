import { Flex, Text } from "@mantine/core";
import { CourseDetails } from "@entities/course";
import { Heading } from "@shared/ui";
import useStyles from "./AmountInfo.styles";

export interface AmountInfoProps {
    data: CourseDetails;
}

const AmountInfo = ({ data }: AmountInfoProps) => {
    const { classes } = useStyles();

    if (data.discount) {
        return (
            <Flex sx={{ gap: 6 }}>
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
