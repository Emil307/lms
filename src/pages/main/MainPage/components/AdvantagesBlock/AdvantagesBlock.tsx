import { Flex, GridProps, Grid, Text, Title, Skeleton } from "@mantine/core";
import React, { useMemo } from "react";
import { useAdvantages } from "@entities/staticPage";
import { initialParams } from "./constants";
import useStyles from "./AdvantagesBlock.styles";

export interface AdvantagesBlockProps extends Omit<GridProps, "children"> {}

const AdvantagesBlock = (props: AdvantagesBlockProps) => {
    const { classes } = useStyles();

    const { data: advantagesData, isLoading } = useAdvantages(initialParams);

    const renderAdvantages = useMemo(
        () =>
            advantagesData?.data.map((advantage) => (
                <Grid.Col key={advantage.id} sm={3} span={6}>
                    <Flex className={classes.advantageItem}>
                        <Title order={1} color="dark">
                            {advantage.title}
                        </Title>
                        <Text className={classes.advantageDescription}>{advantage.description}</Text>
                    </Flex>
                </Grid.Col>
            )),
        [advantagesData],
    );

    if (!advantagesData?.data.length) {
        return null;
    }

    return (
        <Skeleton visible={isLoading} mih={160} radius={24}>
            <Grid gutter={24} {...props}>
                {renderAdvantages}
            </Grid>
        </Skeleton>
    );
};

export default AdvantagesBlock;
