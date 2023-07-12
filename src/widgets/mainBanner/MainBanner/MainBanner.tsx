import { Avatar, Box, BoxProps, Flex, Skeleton, Text, ThemeIcon } from "@mantine/core";
import Image from "next/image";
import { useMainBanner } from "@entities/staticPage";
import AvatarIcon from "@public/icons/avatar.svg";
import { Button, Heading } from "@shared/ui";
import useStyles from "./MainBanner.styles";

export interface MainBannerProps extends BoxProps {}

const MainBanner = (props: MainBannerProps) => {
    const { classes } = useStyles();

    const { data, isLoading } = useMainBanner();

    const authorFullName = [data?.authorFirstName, data?.authorLastName].join(" ");

    const handleOpenButtonLink = () => window.open(data?.buttonLink, "blank");

    return (
        <Box className={classes.root} {...props}>
            <Skeleton visible={isLoading} h="100%" radius={16}>
                <Box className={classes.imageWrapper}>
                    <Image
                        src={data?.image.absolutePath || ""}
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
                    <Flex className={classes.authorContent}>
                        <Text className={classes.authorShortQuote}>{data?.authorShortQuote}</Text>
                        <Flex gap={8}>
                            <Avatar
                                src={data?.authorImage?.absolutePath}
                                alt="avatar"
                                w={44}
                                h={44}
                                miw={44}
                                radius={160}
                                styles={(theme) => ({
                                    placeholder: { backgroundColor: theme.colors.grayLight[0] },
                                })}>
                                <ThemeIcon variant="outline" className={classes.avatarDefaultIconWrapper}>
                                    <AvatarIcon />
                                </ThemeIcon>
                            </Avatar>
                            <Flex direction="column" gap={2}>
                                <Text className={classes.authorFullName}>{authorFullName}</Text>
                                <Text className={classes.authorAbout}>{data?.authorAbout}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Skeleton>
        </Box>
    );
};

export default MainBanner;
