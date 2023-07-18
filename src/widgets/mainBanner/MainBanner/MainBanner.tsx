import { Box, BoxProps, Flex, Skeleton, Text } from "@mantine/core";
import Image from "next/image";
import { useMainBanner } from "@entities/staticPage";
import { Button, Heading } from "@shared/ui";
import useStyles from "./MainBanner.styles";
import { AuthorInfoCard } from "./components";

export interface MainBannerProps extends BoxProps {}

const MainBanner = (props: MainBannerProps) => {
    const { classes } = useStyles();

    const { data, isLoading } = useMainBanner();

    const handleOpenButtonLink = () => window.open(data?.buttonLink, "blank");

    return (
        <Box className={classes.root}>
            <Box className={classes.inner} {...props}>
                <Skeleton visible={isLoading} h="100%" radius={16}>
                    <Box className={classes.imageWrapper}>
                        <Image
                            src={data?.image?.absolutePath || ""}
                            alt="background"
                            loader={({ src }) => `${src}`}
                            fill
                            sizes="100vw"
                            style={{
                                objectFit: "cover",
                                objectPosition: "center",
                                borderRadius: 24,
                            }}
                        />
                    </Box>
                    <Flex className={classes.wrapperContent}>
                        <Flex className={classes.headerContent}>
                            <Flex direction="column" gap={24}>
                                <Text className={classes.title}>{data?.title}</Text>
                                <Heading order={3} color="white">
                                    {data?.subTitle}
                                </Heading>
                            </Flex>
                            <Button size="large" w="min-content" h={72} onClick={handleOpenButtonLink}>
                                {data?.buttonText}
                            </Button>
                        </Flex>
                    </Flex>
                </Skeleton>
            </Box>
            <AuthorInfoCard data={data} />
        </Box>
    );
};

export default MainBanner;
