import { Avatar, ThemeIcon } from "@mantine/core";
import { IconReceipt } from "@tabler/icons-react";
import { Unlock } from "react-feather";
import AvatarIcon from "public/icons/avatar.svg";
import { NotificationFromList } from "@entities/notification";
import IconBookWithPencil from "public/icons/bookWithPencil.svg";
import IconBookWithMark from "public/icons/bookWithMark.svg";
import useStyles from "./NotificationIcon.styles";

export interface NotificationIconProps {
    data: NotificationFromList;
}

const NotificationIcon = ({ data }: NotificationIconProps) => {
    const { classes } = useStyles();

    switch (data.type) {
        case "groupAdded":
            return (
                <ThemeIcon className={classes.groupAddedIcon}>
                    <Unlock />
                </ThemeIcon>
            );
        case "invoiceForPayment":
            return (
                <ThemeIcon className={classes.invoiceForPaymentIcon}>
                    <IconReceipt />
                </ThemeIcon>
            );
        case "newHomework":
            return (
                <ThemeIcon className={classes.homeworkIcon}>
                    <IconBookWithPencil />
                </ThemeIcon>
            );
        case "homeworkChecked":
            return (
                <ThemeIcon className={classes.homeworkIcon}>
                    <IconBookWithMark />
                </ThemeIcon>
            );

        default:
            return (
                <Avatar src={data.sender?.profile.avatar?.absolutePath} alt="avatar" className={classes.avatarWrapper}>
                    <ThemeIcon className={classes.avatarDefaultIconWrapper}>
                        <AvatarIcon />
                    </ThemeIcon>
                </Avatar>
            );
    }
};

export default NotificationIcon;
