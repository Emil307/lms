import { Avatar, Flex, FlexProps, Indicator, ThemeIcon } from "@mantine/core";
import { memo } from "react";
import AvatarIcon from "public/icons/avatar.svg";
import { getFullName } from "@shared/utils";
import { Paragraph } from "@shared/ui";
import { AdminHomeworkAnswerMessage } from "@entities/lesson";
import { Roles } from "@app/routes";
import useStyles from "./MessageItem.styles";
import { getFormatCreatedAt } from "./utils";

export interface MessageItemProps extends Omit<FlexProps, "onClick"> {
    data: AdminHomeworkAnswerMessage;
}

const MemoizedMessageItem = memo(function MessageItem({ data, ...props }: MessageItemProps) {
    const { classes } = useStyles();

    const getUserRole = () => {
        switch (data.sender.roles[0].id) {
            case Roles.student:
                return "Ученик";
            case Roles.administrator:
                return "Администратор";
            default:
                return "Куратор";
        }
    };

    return (
        <Indicator size={8} offset={16} position="top-start" color="done" disabled={data.isRead}>
            <Flex {...props} className={classes.root}>
                <Flex gap={8}>
                    <Avatar src={data.sender.profile.avatar?.absolutePath} alt="avatar" className={classes.avatarWrapper}>
                        <ThemeIcon className={classes.avatarDefaultIconWrapper}>
                            <AvatarIcon />
                        </ThemeIcon>
                    </Avatar>
                    <Flex className={classes.userInfo}>
                        <Flex direction="column">
                            <Paragraph variant="text-small-m">{getFullName({ data: data.sender.profile })}</Paragraph>
                            <Paragraph variant="text-caption" color="gray45">
                                {getUserRole()}
                            </Paragraph>
                        </Flex>
                        <Paragraph variant="text-caption" className={classes.createdAtLastMessage}>
                            {getFormatCreatedAt(data.createdAt)}
                        </Paragraph>
                    </Flex>
                </Flex>
                <Paragraph variant="text-small-m">{data.content}</Paragraph>
            </Flex>
        </Indicator>
    );
});

export default MemoizedMessageItem;
