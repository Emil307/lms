import { Card as MCard, Badge } from "@mantine/core";
import { memo } from "react";
import { CourseDiscount } from "@entities/coursePackage";
import { getLocalizationDate } from "@shared/utils";
import useStyles from "./DiscountInfo.styles";

export interface DiscountInfoProps {
    data: {
        isDiscount: boolean;
        discount?: CourseDiscount;
    };
}

const MemoizedDiscountInfo = memo(function DiscountInfo({ data }: DiscountInfoProps) {
    const { classes } = useStyles();
    if (!data.isDiscount || !data.discount) {
        return null;
    }

    return (
        <MCard.Section className={classes.root}>
            <Badge variant="outline" className={classes.discount}>
                {data.discount.value} %
            </Badge>
            {data.discount.to && (
                <Badge variant="outline" className={classes.discountEndDate}>
                    {`Доступно до ${getLocalizationDate(data.discount.to)}`}
                </Badge>
            )}
        </MCard.Section>
    );
});

export default MemoizedDiscountInfo;
