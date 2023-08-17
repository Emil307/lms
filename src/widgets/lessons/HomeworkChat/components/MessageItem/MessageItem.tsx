import { Avatar, Flex, FlexProps, Indicator, ThemeIcon } from "@mantine/core";
import { memo } from "react";
import AvatarIcon from "public/icons/avatar.svg";
import { getFullName } from "@shared/utils";
import { Paragraph } from "@shared/ui";
import { HomeworkAnswerMessage } from "@entities/lesson";
import useStyles from "./MessageItem.styles";
import { getFormatCreatedAt } from "./utils";

export interface MessageItemProps extends Omit<FlexProps, "onClick"> {
    data: HomeworkAnswerMessage;
}

const MemoizedMessageItem = memo(function MessageItem({ data, ...props }: MessageItemProps) {
    const { classes } = useStyles();

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
                                {data.sender.roles[0].displayName}
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
