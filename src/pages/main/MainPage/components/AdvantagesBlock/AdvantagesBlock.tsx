import { Flex, Grid, Skeleton, BoxProps, Box } from "@mantine/core";
import React, { useMemo } from "react";
import { useAdvantages } from "@entities/staticPage";
import { Heading, Paragraph } from "@shared/ui";
import { initialParams } from "./constants";
import useStyles from "./AdvantagesBlock.styles";

export interface AdvantagesBlockProps extends Omit<BoxProps, "children"> {}

const AdvantagesBlock = (props: AdvantagesBlockProps) => {
    const { classes } = useStyles();

    const { data: advantagesData, isLoading } = useAdvantages(initialParams);

    const renderAdvantages = useMemo(
        () =>
            advantagesData?.data.map((advantage) => (
                <Grid.Col key={advantage.id} sm={3} span={6}>
                    <Flex className={classes.advantageItem}>
                        <Heading>{advantage.title}</Heading>
                        <Paragraph variant="text-small-m" color="gray45" px={{ md: 30, sm: 0 }}>
                            {advantage.description}
                        </Paragraph>
                    </Flex>
                </Grid.Col>
            )),
        [advantagesData]
    );

    if (!advantagesData?.data.length) {
        return null;
    }

    return (
        <Skeleton visible={isLoading} mih={160} radius={24}>
            <Box {...props}>
                <Grid gutter={8} gutterMd={24}>
                    {renderAdvantages}
                </Grid>
            </Box>
        </Skeleton>
    );
};

export default AdvantagesBlock;
