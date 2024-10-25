import { Flex, Grid, Skeleton, BoxProps, Box } from "@mantine/core";
import React, { useMemo } from "react";
import Image from "next/image";
import { useAdvantages } from "@entities/staticPage";
import { Heading, Paragraph } from "@shared/ui";
import testIcon from "public/test-icon.png";
import { initialParams } from "./constants";
import useStyles from "./AdvantagesBlock.styles";

export interface AdvantagesBlockProps extends Omit<BoxProps, "children"> {}

const AdvantagesBlock = (props: AdvantagesBlockProps) => {
    const { classes } = useStyles();

    const { data: advantagesData, isLoading } = useAdvantages(initialParams);

    const renderAdvantages = useMemo(
        () =>
            advantagesData?.data.map((advantage) => (
                <Grid.Col key={advantage.id} sm={12} md={6} lg={4}>
                    <Flex className={classes.advantageItem}>
                        <Flex className={classes.headerTitle}>
                            <Image
                                src={advantage.icon?.absolutePath !== undefined ? advantage.icon.absolutePath : testIcon}
                                alt="testIcon"
                                width={56}
                                height={56}
                                className={classes.titleIcon}></Image>
                            <Heading order={3} color="dark">
                                {advantage.title}
                            </Heading>
                        </Flex>
                        <Paragraph variant="large" color="neutralMain50">
                            {advantage.description}
                        </Paragraph>
                    </Flex>
                </Grid.Col>
            )),
        [advantagesData],
    );

    if (!advantagesData?.data.length) {
        return null;
    }

    return (
        <Skeleton visible={isLoading} mih={160} radius={24} mt={{ base: 64, sm: 112 }} className={classes.container}>
            <Box {...props}>
                <Grid gutter={24} gutterMd={24} maw={1320}>
                    {renderAdvantages}
                </Grid>
            </Box>
        </Skeleton>
    );
};

export default AdvantagesBlock;
