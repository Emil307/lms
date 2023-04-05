import { Badge, Flex } from "@mantine/core";
import { memo } from "react";
import { CourseDiscount } from "@entities/coursePackage";
import { getHumanDate } from "@shared/utils";
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
        <Flex gap={8}>
            <Badge variant="outline" className={classes.discount}>
                {data.discount.value} %
            </Badge>
            {data.discount.to && (
                <Badge variant="outline" className={classes.discountEndDate}>
                    {`Доступно до ${getHumanDate(new Date(data.discount.to), {
                        month: "long",
                        day: "2-digit",
                    })}`}
                </Badge>
            )}
        </Flex>
    );
});

export default MemoizedDiscountInfo;
