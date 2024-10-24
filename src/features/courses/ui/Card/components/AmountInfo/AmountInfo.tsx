import { Flex } from "@mantine/core";
import { CourseFromList } from "@entities/course";
import { Heading, Paragraph } from "@shared/ui";
import { hasDiscount } from "@shared/utils";

export interface AmountInfoProps {
    data: Pick<CourseFromList, "discountPrice" | "price" | "discount">;
}

const AmountInfo = ({ data }: AmountInfoProps) => {
    if (hasDiscount({ discount: data.discount, defaultPrice: data.price, discountPrice: data.discountPrice })) {
        return (
            <Flex align="flex-start" gap={6}>
                <Heading order={2} color="dark">{`${data.discountPrice.toLocaleString("ru")} ₽`}</Heading>
                <Paragraph variant="large" td="line-through" color="gray45">{`${data.price.toLocaleString("ru")} ₽`}</Paragraph>
            </Flex>
        );
    }
    return <Heading order={2} color="dark">{`${data.price.toLocaleString("ru")} ₽`}</Heading>;
};

export default AmountInfo;
