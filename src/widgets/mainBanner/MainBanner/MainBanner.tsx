import { Box, BoxProps, Flex, Skeleton, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { Route } from "nextjs-routes";
import { useMainBanner } from "@entities/staticPage";
import { Button, Heading } from "@shared/ui";
import { useMedia } from "@shared/utils";
import useStyles from "./MainBanner.styles";

export interface MainBannerProps extends BoxProps {}

const MainBanner = (props: MainBannerProps) => {
    const { classes } = useStyles();

    const { data, isLoading } = useMainBanner();
    const isTablet = useMedia("sm");

    return (
        <Flex className={classes.root}>
            <Box className={classes.inner} {...props}>
                <Skeleton visible={isLoading} h="100%" radius={isTablet ? 24 : 56}>
                    <Box className={classes.imageWrapper}>
                        <Image
                            src={data?.image?.absolutePath ?? ""}
                            alt="background"
                            fill
                            sizes="100vw"
                            style={{
                                objectFit: "cover",
                                objectPosition: "center",
                                borderRadius: 24,
                            }}
                            priority
                        />
                    </Box>
                    <Flex className={classes.wrapperContent}>
                        <Flex className={classes.headerContent}>
                            <Flex className={classes.titleContent}>
                                <Text className={classes.title}>{data?.title}</Text>
                                <Heading className={classes.subtitle} order={3} color="white">
                                    {data?.subTitle}
                                </Heading>
                            </Flex>
                            {data?.buttonLink && (
                                <Button
                                    component={Link}
                                    href={data.buttonLink as unknown as Route}
                                    size="large"
                                    w="min-content"
                                    variant="secondary"
                                    className={classes.button}>
                                    {data.buttonText}
                                </Button>
                            )}
                        </Flex>
                    </Flex>
                </Skeleton>
            </Box>
        </Flex>
    );
};

export default MainBanner;
