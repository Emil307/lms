import { Box, Flex, FlexProps } from "@mantine/core";
import Image from "next/image";
import { memo } from "react";
import { GetAboutResponse } from "@entities/staticPage";
import { Button, Heading, Paragraph } from "@shared/ui";
import useStyles from "./AboutCard.styles";

export interface AboutCardProps extends Omit<FlexProps, "children"> {
    data?: GetAboutResponse;
}

const MemoizedAboutCard = memo(function AboutCard({ data, className, ...props }: AboutCardProps) {
    const { classes, cx } = useStyles();

    return (
        <Flex className={cx(classes.root, className)} {...props}>
            {data?.banner && (
                <Box className={classes.imageSection}>
                    <Image
                        src={data.banner.absolutePath}
                        loader={({ src }) => `${src}`}
                        alt={data.banner.name}
                        fill
                        sizes="100vw"
                        className={classes.bannerImage}
                    />
                </Box>
            )}
            <Flex className={classes.contentSection}>
                <Flex className={classes.headingContentSection}>
                    <Heading order={2}>{data?.title}</Heading>
                    <Button w="min-content">Подобрать курс</Button>
                </Flex>
                <Paragraph variant="small-m" className={classes.shortContent}>
                    {data?.shortContent}
                </Paragraph>
            </Flex>
        </Flex>
    );
});

export default MemoizedAboutCard;
