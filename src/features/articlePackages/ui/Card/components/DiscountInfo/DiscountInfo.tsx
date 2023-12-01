import { Badge, Flex } from "@mantine/core";
import dayjs from "dayjs";
import { Discount } from "@shared/types";
import useStyles from "./DiscountInfo.styles";

export interface DiscountInfoProps {
    fullPrice: number;
    discountPrice: number;
    discount?: Discount | null;
}

const DiscountInfo = ({ discount, fullPrice, discountPrice }: DiscountInfoProps) => {
    const { classes } = useStyles();
    if (!discount || fullPrice === discountPrice) {
        return null;
    }

    const discountValue = discount.type === "percentage" ? `${discount.amount} %` : `${discount.amount} ₽`;

    return (
        <Flex className={classes.root}>
            <Badge className={classes.discount}>-{discountValue}</Badge>
            <Badge variant="outline" className={classes.discountEndDate}>
                {`Доступно до ${dayjs(discount.finishingDate).format("D MMMM YYYY")}`}
            </Badge>
        </Flex>
    );
};

export default DiscountInfo;
