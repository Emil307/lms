import { Badge, Flex } from "@mantine/core";
import dayjs from "dayjs";
import { Discount } from "@shared/types";
import useStyles from "./DiscountInfo.styles";

export interface DiscountInfoProps {
    discount?: Discount | null;
}

const DiscountInfo = ({ discount }: DiscountInfoProps) => {
    const { classes } = useStyles();
    if (!discount) {
        return null;
    }

    const discountValue = discount.type === "percentage" ? `${discount.amount} %` : `-${discount.amount} ₽`;

    return (
        <Flex gap={8}>
            <Badge className={classes.discount}>{discountValue}</Badge>
            <Badge className={classes.discountEndDate}>{`Доступно до ${dayjs(discount.finishingDate).format("D MMMM ")}`}</Badge>
        </Flex>
    );
};

export default DiscountInfo;
