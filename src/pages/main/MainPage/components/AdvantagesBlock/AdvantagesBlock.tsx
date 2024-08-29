import { Flex, Grid, Skeleton, BoxProps, Box } from "@mantine/core";
import React, { useMemo } from "react";
import Image from "next/image";
import { useAdvantages } from "@entities/staticPage";
import { Paragraph } from "@shared/ui";
import { useMedia } from "@shared/utils";
import testIcon from "public/test-icon.png";
import { initialParams } from "./constants";
import useStyles from "./AdvantagesBlock.styles";

export interface AdvantagesBlockProps extends Omit<BoxProps, "children"> {}

const AdvantagesBlock = (props: AdvantagesBlockProps) => {
    const { classes } = useStyles();

    const { data: advantagesData, isLoading } = useAdvantages(initialParams);
    const isTablet = useMedia("sm");

    const renderAdvantages = useMemo(
        () =>
            advantagesData?.data.map((advantage) => (
                <Grid.Col key={advantage.id} sm={isTablet ? 12 : 4} span={isTablet ? 12 : 6}>
                    <Flex className={classes.advantageItem}>
                        <Flex className={classes.headerTitle}>
                            <Image src={testIcon} alt="testIcon" className={classes.titleIcon}></Image>
                            <Flex className={classes.title}>{advantage.title}</Flex>
                        </Flex>
                        <Paragraph fz={18} variant="text-small-m" color="gray45">
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
        <Skeleton visible={isLoading} mih={160} radius={24} mt={112} className={classes.container}>
            <Box {...props}>
                <Grid gutter={24} gutterMd={24} maw={1320}>
                    {renderAdvantages}
                </Grid>
            </Box>
        </Skeleton>
    );
};

export default AdvantagesBlock;
