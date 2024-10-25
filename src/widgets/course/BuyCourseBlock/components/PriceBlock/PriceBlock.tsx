import React from "react";
import { BoxProps, Flex } from "@mantine/core";
import { Heading, Paragraph } from "@shared/ui";
import { formatPrice } from "@widgets/course/BuyCourseBlock/utils";
import { hasDiscount } from "@shared/utils";
import { CourseDetails } from "@entities/course";
import useStyles from "./PriceBlock.styles";

export interface PriceBlockProps extends Omit<BoxProps, "children"> {
    data: CourseDetails;
}

const PriceBlock = ({ data, ...props }: PriceBlockProps) => {
    const { classes } = useStyles();
    if (!hasDiscount({ discount: data.discount, discountPrice: data.discountPrice, defaultPrice: data.price })) {
        return (
            <Flex align="center" gap={16}>
                <Heading order={1} className={classes.price}>
                    {formatPrice(data.price)} ₽
                </Heading>
                <Paragraph variant="large" className={classes.button}>
                    /курс
                </Paragraph>
            </Flex>
        );
    }
    return (
        <Flex {...props} direction="column" gap={8}>
            <Flex align="center" gap={16}>
                <Paragraph variant="large" color="neutralMain50" className={classes.fullPrice}>
                    {formatPrice(data.price)} ₽
                </Paragraph>
                <Paragraph variant="large" className={classes.button}>
                    /курс
                </Paragraph>
            </Flex>
            <Flex align="center" gap={16}>
                <Heading order={1} className={classes.price}>
                    {formatPrice(data.discountPrice)} ₽
                </Heading>
                <Paragraph variant="large" className={classes.button}>
                    /курс
                </Paragraph>
            </Flex>
        </Flex>
    );
};
export default PriceBlock;
