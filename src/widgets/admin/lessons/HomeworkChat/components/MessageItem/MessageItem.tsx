import { Avatar, Flex, FlexProps, ThemeIcon } from "@mantine/core";
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
        if (data.sender.roles[0].id === Roles.student) {
            return "Ученик";
        }
        return "Куратор";
    };

    return (
        <Flex {...props} className={classes.root}>
            <Flex align="center" gap={8}>
                <Avatar src={data.sender.profile.avatar?.absolutePath} alt="avatar" className={classes.avatarWrapper}>
                    <ThemeIcon className={classes.avatarDefaultIconWrapper}>
                        <AvatarIcon />
                    </ThemeIcon>
                </Avatar>
                <Flex className={classes.userInfo}>
                    <Flex direction="column">
                        <Paragraph variant="text-small-m" lineClamp={1}>
                            {getFullName({ data: data.sender.profile })}
                        </Paragraph>
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
    );
});

export default MemoizedMessageItem;
