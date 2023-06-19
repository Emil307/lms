import { Avatar, Flex, FlexProps, ThemeIcon, Text, Indicator } from "@mantine/core";
import { memo } from "react";
import { AdminSupportConversationFromList } from "@entities/support";
import AvatarIcon from "public/icons/avatar.svg";
import { getFullName } from "@shared/utils";
import useStyles from "./ChatItem.styles";
import { getFormatCreatedAt } from "./utils";

export interface ChatItemProps extends Omit<FlexProps, "onClick"> {
    data: AdminSupportConversationFromList;
    isSelected: boolean;
    onClick?: (conversation: AdminSupportConversationFromList) => void;
}

const MemoizedChatItem = memo(function ChatItem({ data, onClick = () => undefined, isSelected, ...props }: ChatItemProps) {
    const { classes } = useStyles({ isSelected });

    const handleClick = () => onClick(data);

    return (
        <Indicator size={8} offset={16} position="top-start" color="done" disabled={!data.hasSupportMessage}>
            <Flex {...props} className={classes.root} onClick={handleClick}>
                <Flex gap={8}>
                    <Avatar
                        src={data.profile.avatar?.absolutePath}
                        alt="avatar"
                        w={32}
                        h={32}
                        miw={32}
                        radius={160}
                        styles={(theme) => ({
                            placeholder: { backgroundColor: theme.colors.grayLight[0] },
                        })}>
                        <ThemeIcon variant="outline" className={classes.avatarDefaultIconWrapper}>
                            <AvatarIcon />
                        </ThemeIcon>
                    </Avatar>
                    <Flex className={classes.userInfo}>
                        <Text className={classes.userFullName} lineClamp={1}>
                            {getFullName({ data: data.profile })}
                        </Text>
                        <Text className={classes.createdAtLastMessage}>{getFormatCreatedAt(data.lastSupportMessage.createdAt)}</Text>
                    </Flex>
                </Flex>

                <Text className={classes.lastMesssageContent} lineClamp={1}>
                    {data.lastSupportMessage.message}
                </Text>
            </Flex>
        </Indicator>
    );
});

export default MemoizedChatItem;
