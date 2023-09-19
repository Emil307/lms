import { Flex } from "@mantine/core";
import React from "react";
import { Heading, Paragraph, RingProgress } from "@shared/ui";
import useStyles from "./Card.styles";

interface CardProps {
    title: string;
    completedCount: number;
    totalCount: number;
    completedPercent: number;
    passingText: string;
    passingLabel: string;
    type: "homework" | "test" | "lessons";
}

const Card = ({ title, completedCount, totalCount, completedPercent, type, passingText, passingLabel }: CardProps) => {
    const { classes } = useStyles({ type });

    return (
        <Flex className={classes.card}>
            <Flex className={classes.main}>
                <Heading order={4}>{title}</Heading>
                <Paragraph variant="text-small-m">
                    {completedCount}/{totalCount} {passingText}
                </Paragraph>
            </Flex>
            <RingProgress value={completedPercent} label={passingLabel} />
        </Flex>
    );
};

export default Card;
