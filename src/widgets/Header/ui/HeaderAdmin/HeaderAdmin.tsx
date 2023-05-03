import React from "react";
import { ActionIcon, Avatar, Flex, Header as MHeader, Text, ThemeIcon } from "@mantine/core";
import { LogOut, Settings } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import AvatarIcon from "public/icons/avatar.svg";
import { useSession } from "@features/auth";
import useStyles from "./HeaderAdmin.styles";

const HeaderAdmin = () => {
    const router = useRouter();
    const { classes } = useStyles();
    const { user } = useSession();

    const handleRedirectProfilePage = () => router.push({ pathname: "/admin/users/[id]", query: { id: String(user?.id) } });
    const handleRedirectLogout = () => router.push("/logout");

    return (
        <MHeader classNames={classes} height="auto" fixed={false}>
            <Flex justify="space-between">
                <Button variant="text">Notification</Button>

                <Flex align="center" gap={32}>
                    <Flex align="center" gap={16}>
                        <Avatar
                            src={user?.profile.avatar?.absolutePath}
                            alt="avatar"
                            w={50}
                            h={50}
                            radius={160}
                            styles={(theme) => ({
                                placeholder: { backgroundColor: theme.colors.grayLight[0] },
                            })}>
                            <ThemeIcon variant="outline" className={classes.avatarDefaultIconWrapper}>
                                <AvatarIcon />
                            </ThemeIcon>
                        </Avatar>
                        <Flex direction="column">
                            <Text className={classes.fullUserName}>{`${user?.profile.firstName} ${user?.profile.lastName}`}</Text>
                            <Text className={classes.roleName}>{user?.roles[0].displayName}</Text>
                        </Flex>
                    </Flex>
                    <Flex gap={8}>
                        <ActionIcon className={classes.buttonIcon} onClick={handleRedirectProfilePage}>
                            <Settings />
                        </ActionIcon>

                        <ActionIcon className={classes.buttonIcon} onClick={handleRedirectLogout}>
                            <LogOut />
                        </ActionIcon>
                    </Flex>
                </Flex>
            </Flex>
        </MHeader>
    );
};

export default HeaderAdmin;
