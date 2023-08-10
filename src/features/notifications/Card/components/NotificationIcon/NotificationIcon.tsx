import { Avatar, ThemeIcon } from "@mantine/core";
import { IconReceipt } from "@tabler/icons-react";
import { Key, Unlock } from "react-feather";
import AvatarIcon from "public/icons/avatar.svg";
import { NotificationFromList } from "@entities/notification";
import IconBookWithPencil from "public/icons/bookWithPencil.svg";
import useStyles from "./NotificationIcon.styles";

export interface NotificationIconProps {
    data: NotificationFromList;
}

const NotificationIcon = ({ data }: NotificationIconProps) => {
    const { classes } = useStyles();

    //TODO: типы моки, так как их еще реально нет
    switch (data.type) {
        case "paymentMessage":
            return (
                <ThemeIcon className={classes.wrapperPaymentIcon}>
                    <IconReceipt />
                </ThemeIcon>
            );
        case "homeworkMessage":
            return (
                <ThemeIcon className={classes.wrapperHomeworkIcon}>
                    <IconBookWithPencil />
                </ThemeIcon>
            );
        case "unlockCourse":
            return (
                <ThemeIcon className={classes.wrapperUnlockCourseIcon}>
                    <Unlock />
                </ThemeIcon>
            );

        case "unlockFreeCourse":
            return (
                <ThemeIcon className={classes.wrapperUnlockFreeCourseIcon}>
                    <Key />
                </ThemeIcon>
            );

        default:
            return (
                <Avatar src={data.sender.profile.avatar?.absolutePath} alt="avatar" className={classes.avatarWrapper}>
                    <ThemeIcon className={classes.avatarDefaultIconWrapper}>
                        <AvatarIcon />
                    </ThemeIcon>
                </Avatar>
            );
    }
};

export default NotificationIcon;
