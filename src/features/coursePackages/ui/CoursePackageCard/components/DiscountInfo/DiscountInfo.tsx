import { Card as MCard, Badge } from "@mantine/core";
import { getHumanDate } from "@shared/utils";
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

    const discountValue = `${discount.amount} ${discount.type === "percentage" ? "%" : "₽"}`;

    return (
        <MCard.Section className={classes.root}>
            <Badge variant="outline" className={classes.discount}>
                {discountValue}
            </Badge>
            {discount.finishingDate && (
                <Badge variant="outline" className={classes.discountEndDate}>
                    {`Доступно до ${getHumanDate(discount.finishingDate, {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                    })}`}
                </Badge>
            )}
        </MCard.Section>
    );
};

export default DiscountInfo;
