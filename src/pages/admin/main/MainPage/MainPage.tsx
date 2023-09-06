import Image from "next/image";
import { Avatar, Box, Flex, Skeleton } from "@mantine/core";
import React from "react";
import backgroundImage from "public/background-image-auth.png";
import useStyles from "./MainPage.styles";
import { useSession } from "@entities/auth";
import AvatarIcon from "@public/icons/avatar.svg";
import { Heading } from "@shared/ui";

const MainPage = () => {
    const { classes } = useStyles();

    const { user } = useSession();

    const renderContent = () => {
        return (
            <Flex className={classes.content}>
                <Flex className={classes.avatarWrapper}>
                    <Skeleton visible={!user} w="89%" h="89%" radius={160}>
                        <Avatar
                            src={user?.profile.avatar?.absolutePath}
                            alt="avatar"
                            w="100%"
                            h="100%"
                            radius={160}
                            styles={(theme) => ({ placeholder: { backgroundColor: theme.colors.grayLight[0] } })}>
                            <AvatarIcon />
                        </Avatar>
                    </Skeleton>
                </Flex>
                <Flex className={classes.textWrapper}>
                    <Skeleton visible={!user} radius={160}>
                        <Heading>Привет, {user?.profile.firstName}!</Heading>
                    </Skeleton>
                    <Skeleton visible={!user} radius={160}>
                        <Heading order={3} color="neutral_gray">
                            Добро пожаловать в раздел администрирования платформы.
                        </Heading>
                    </Skeleton>
                </Flex>
            </Flex>
        );
    };

    return (
        <Box>
            <Box className={classes.wrapper}>
                <Image
                    src={backgroundImage}
                    alt="background"
                    fill
                    style={{
                        objectFit: "cover",
                        borderRadius: 12,
                    }}
                />
                {renderContent()}
            </Box>
        </Box>
    );
};

export default MainPage;
