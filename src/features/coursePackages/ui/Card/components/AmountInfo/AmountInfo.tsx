import { Card as MCard, Text, Flex } from "@mantine/core";
import { useRouter } from "next/router";
import { Button, Heading } from "@shared/ui";
import { CoursePackage } from "@entities/coursePackage";
import useStyles from "./AmountInfo.styles";

export interface AmountInfoProps {
    data: Pick<CoursePackage, "discount" | "discountPrice" | "price" | "id">;
}

const AmountInfo = ({ data }: AmountInfoProps) => {
    const router = useRouter();
    const { classes } = useStyles({ hasDiscount: !!data.discount });

    const handleClickCard = () => router.push({ pathname: "/course-packages/[id]", query: { id: data.id.toString() } });

    const renderAmount = () => {
        if (data.discount) {
            return (
                <Flex align="center" sx={{ gap: 6 }}>
                    <Heading order={3} className={classes.price}>{`${data.discountPrice.toLocaleString("ru")} ₽`}</Heading>
                    <Text className={classes.priceWithoutDiscount}>{`${data.price.toLocaleString("ru")} ₽`}</Text>
                </Flex>
            );
        }
        return <Text className={classes.price}>{`${data.price.toLocaleString("ru")} ₽`}</Text>;
    };

    return (
        <MCard.Section className={classes.root}>
            <Button onClick={handleClickCard}>Подробнее</Button>
            <Flex direction="column" gap={data.discount ? 2 : 6}>
                <Text className={classes.amountDescription}>Стоимость пакета</Text>
                {renderAmount()}
            </Flex>
        </MCard.Section>
    );
};

export default AmountInfo;
