import React, { useContext } from "react";
import { ActionIcon, Avatar, Flex, Header as MHeader, ThemeIcon, MediaQuery } from "@mantine/core";
import { AlignLeft, LogOut, Settings, X } from "react-feather";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import AvatarIcon from "public/icons/avatar.svg";
import { useSession } from "@features/auth";
import { Logo } from "@components/Logo";
import { Menu as NotificationMenu } from "@widgets/notifications";
import { Paragraph } from "@shared/ui";
import { AdminSidebarMenuContext } from "@app/layouts/AdminLayout/utils";
import useStyles from "./HeaderAdmin.styles";

const HeaderAdmin = () => {
    const router = useRouter();
    const { classes } = useStyles();
    const { user } = useSession();
    const { openedSidebar, setOpenedSidebar } = useContext(AdminSidebarMenuContext);

    const isTablet = useMediaQuery("(max-width: 744px)");

    const handleRedirectProfilePage = () => router.push({ pathname: "/admin/users/[id]", query: { id: String(user?.id) } });
    const handleRedirectLogout = () => router.push("/logout");

    const handleChangeOpenedSidebar = () => setOpenedSidebar(!openedSidebar);

    const renderSidebarBurger = () => {
        if (openedSidebar) {
            return (
                <ActionIcon className={classes.closeSidebarIcon} onClick={handleChangeOpenedSidebar}>
                    <X />
                </ActionIcon>
            );
        }

        return (
            <ActionIcon className={classes.burgerSidebarIcon} onClick={handleChangeOpenedSidebar}>
                <AlignLeft />
            </ActionIcon>
        );
    };

    return (
        <MHeader classNames={classes} height="auto">
            <Link href="/" className={classes.logoLink} onClick={() => setOpenedSidebar(false)}>
                <Logo
                    className={classes.logo}
                    textProps={{
                        className: classes.logoText,
                    }}
                />
            </Link>
            <Flex className={classes.wrapperRightMenu}>
                <NotificationMenu position={isTablet ? "bottom-end" : "bottom-start"} />

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
                            <ThemeIcon className={classes.avatarDefaultIconWrapper}>
                                <AvatarIcon />
                            </ThemeIcon>
                        </Avatar>
                        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                            <Flex direction="column">
                                <Paragraph variant="small-m">{`${user?.profile.firstName} ${user?.profile.lastName}`}</Paragraph>
                                <Paragraph variant="text-caption" color="gray45">
                                    {user?.roles[0].displayName}
                                </Paragraph>
                            </Flex>
                        </MediaQuery>
                    </Flex>

                    <Flex className={classes.containerButtonLinks}>
                        <ActionIcon className={classes.buttonIcon} onClick={handleRedirectProfilePage}>
                            <Settings />
                        </ActionIcon>

                        <ActionIcon className={classes.buttonIcon} onClick={handleRedirectLogout}>
                            <LogOut />
                        </ActionIcon>
                    </Flex>
                </Flex>
                {renderSidebarBurger()}
            </Flex>
        </MHeader>
    );
};

export default HeaderAdmin;
