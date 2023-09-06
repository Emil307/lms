import React, { useContext } from "react";
import { ActionIcon, Avatar, Flex, Header as MHeader, ThemeIcon, MediaQuery, Skeleton } from "@mantine/core";
import { AlignLeft, LogOut, Settings, X } from "react-feather";
import { useRouter } from "next/router";
import Link from "next/link";
import AvatarIcon from "public/icons/avatar.svg";
import { useSession } from "@entities/auth/hooks";
import { Logo } from "@components/Logo";
import { Menu as NotificationMenu } from "@widgets/notifications";
import { Paragraph } from "@shared/ui";
import { AdminSidebarMenuContext } from "@app/layouts/AdminLayout/utils";
import { getStartPage, logoutPath } from "@app/routes";
import { useMedia } from "@shared/utils";
import useStyles from "./HeaderAdmin.styles";

const HeaderAdmin = () => {
    const router = useRouter();
    const { classes } = useStyles();
    const { user } = useSession();
    const { openedSidebar, setOpenedSidebar } = useContext(AdminSidebarMenuContext);

    const isTablet = useMedia("sm");

    const handleRedirectProfilePage = () => router.push("/profile");
    const handleRedirectLogout = () => router.push(logoutPath);

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

    const renderUserInfo = () => {
        if (!user) {
            return <Skeleton visible={true} w={50} h={50} radius={20} />;
        }

        return (
            <Flex align="center" gap={16}>
                <Avatar src={user.profile.avatar?.absolutePath} alt="avatar" className={classes.avatarWrapper}>
                    <ThemeIcon className={classes.avatarDefaultIconWrapper}>
                        <AvatarIcon />
                    </ThemeIcon>
                </Avatar>
                <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                    <Flex direction="column">
                        <Paragraph variant="small-m">{`${user.profile.firstName} ${user.profile.lastName}`}</Paragraph>
                        <Paragraph variant="text-caption" color="gray45">
                            {user.roles[0].displayName}
                        </Paragraph>
                    </Flex>
                </MediaQuery>
            </Flex>
        );
    };

    return (
        <MHeader classNames={classes} height="auto">
            <Link href={getStartPage(user?.roles[0].id)} className={classes.logoLink} onClick={() => setOpenedSidebar(false)}>
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
                    {renderUserInfo()}

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
