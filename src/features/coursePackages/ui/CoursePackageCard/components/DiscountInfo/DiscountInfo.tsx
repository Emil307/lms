import { Card as MCard, Badge } from "@mantine/core";
import { CourseDiscount } from "@entities/coursePackage";
import { getHumanDate } from "@shared/utils";
import useStyles from "./DiscountInfo.styles";

export interface DiscountInfoProps {
    data: {
        isDiscount: boolean;
        discount?: CourseDiscount;
    };
}

const DiscountInfo = ({ data }: DiscountInfoProps) => {
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
                    {`Доступно до ${getHumanDate(new Date(data.discount.to), {
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
