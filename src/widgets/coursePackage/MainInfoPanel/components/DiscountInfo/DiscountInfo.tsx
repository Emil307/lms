import { Badge, Flex } from "@mantine/core";
import { memo } from "react";
import { getHumanDate } from "@shared/utils";
import { Discount } from "@shared/types";
import useStyles from "./DiscountInfo.styles";

export interface DiscountInfoProps {
    data: {
        hasDiscount: boolean;
        discount?: Discount | null;
    };
}

const MemoizedDiscountInfo = memo(function DiscountInfo({ data }: DiscountInfoProps) {
    const { classes } = useStyles();
    if (!data.hasDiscount || !data.discount) {
        return null;
    }

    const discountValue = `${data.discount.amount} ${data.discount.type === "percentage" ? "%" : "₽"}`;

    return (
        <Flex gap={8}>
            <Badge variant="outline" className={classes.discount}>
                {discountValue}
            </Badge>
            {data.discount.finishingDate && (
                <Badge variant="outline" className={classes.discountEndDate}>
                    {`Доступно до ${getHumanDate(data.discount.finishingDate, {
                        month: "long",
                        day: "2-digit",
                    })}`}
                </Badge>
            )}
        </Flex>
    );
});

export default MemoizedDiscountInfo;
