import { Badge } from "@mantine/core";
import { Discount } from "@shared/types";
import useStyles from "./DiscountInfo.styles";

export interface DiscountInfoProps {
    discount: Discount | null;
    discountPrice: number;
    fullPrice: number;
}

const DiscountInfo = ({ discount, discountPrice, fullPrice }: DiscountInfoProps) => {
    const { classes } = useStyles();

    if (!discount || discountPrice === fullPrice) {
        return null;
    }

    const discountText = discount.type === "percentage" ? `${discount.amount} %` : `${discount.amount} ₽`;

    return <Badge className={classes.root}>-{discountText}</Badge>;
};

export default DiscountInfo;
