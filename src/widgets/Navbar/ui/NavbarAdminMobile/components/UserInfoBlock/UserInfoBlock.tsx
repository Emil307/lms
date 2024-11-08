import { ActionIcon, Flex, FlexProps, ThemeIcon } from "@mantine/core";
import { LogOut, Settings } from "react-feather";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useSession } from "@entities/auth/hooks";
import { Paragraph } from "@shared/ui";
import AvatarIcon from "public/icons/avatar.svg";
import { AdminSidebarMenuContext } from "@app/layouts/AdminLayout/utils";
import { logoutPath } from "@app/routes";
import { Avatar } from "@shared/ui";
import useStyles from "./UserInfoBlock.styles";

export interface UserInfoBlockProps extends FlexProps {}

const UserInfoBlock = (props: UserInfoBlockProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { user } = useSession();

    const { setOpenedSidebar } = useContext(AdminSidebarMenuContext);

    const handleRedirectProfilePage = () => {
        router.push("/profile");
    };

    const handleRedirectLogout = () => {
        router.push(logoutPath);
        setOpenedSidebar(false);
    };

    return (
        <Flex className={classes.root} {...props}>
            <Flex align="center" gap={16}>
                <Avatar width={64} height={64} src={user?.profile.avatar?.absolutePath} alt="avatar" classNames={classes}>
                    <ThemeIcon className={classes.avatarDefaultIconWrapper}>
                        <AvatarIcon />
                    </ThemeIcon>
                </Avatar>
                <Flex direction="column">
                    <Paragraph variant="small-m">{`${user?.profile.firstName} ${user?.profile.lastName}`}</Paragraph>
                    <Paragraph variant="text-caption" color="neutralMain50">
                        {user?.roles[0].displayName}
                    </Paragraph>
                </Flex>
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
    );
};

export default UserInfoBlock;
