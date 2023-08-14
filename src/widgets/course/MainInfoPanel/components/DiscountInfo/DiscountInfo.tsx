import { Badge } from "@mantine/core";
import { Discount } from "@shared/types";
import useStyles from "./DiscountInfo.styles";

export interface DiscountInfoProps {
    data: Discount | null;
}

const DiscountInfo = ({ data }: DiscountInfoProps) => {
    const { classes } = useStyles();

    if (!data) {
        return null;
    }

    const discountText = data.type === "percentage" ? `${data.amount} %` : `-${data.amount} ₽`;

    return <Badge className={classes.root}>{discountText}</Badge>;
};

export default DiscountInfo;
