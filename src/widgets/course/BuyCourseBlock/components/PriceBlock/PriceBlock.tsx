import React from "react";
import { BoxProps, Flex } from "@mantine/core";
import { Heading, Paragraph } from "@shared/ui";
import { formatPrice } from "@widgets/course/BuyCourseBlock/utils";
import useStyles from "./PriceBlock.styles";

export interface PriceBlockProps extends Omit<BoxProps, "children"> {
    discountPrice?: number;
    price?: number;
}

const PriceBlock = ({ discountPrice, price, ...props }: PriceBlockProps) => {
    const { classes } = useStyles();
    if (discountPrice === price) {
        return (
            <Flex align="center" gap={16}>
                <Heading order={1} className={classes.price}>
                    {formatPrice(price)} ₽
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
                <Paragraph variant="large" color="gray45" className={classes.fullPrice}>
                    {formatPrice(price)} ₽
                </Paragraph>
                <Paragraph variant="large" className={classes.button}>
                    /курс
                </Paragraph>
            </Flex>
            <Flex align="center" gap={16}>
                <Heading order={1} className={classes.price}>
                    {formatPrice(discountPrice)} ₽
                </Heading>
                <Paragraph variant="large" className={classes.button}>
                    /курс
                </Paragraph>
            </Flex>
        </Flex>
    );
};
export default PriceBlock;
