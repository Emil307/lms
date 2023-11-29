import { Avatar, Flex, FlexProps, ThemeIcon, Indicator, Box } from "@mantine/core";
import { memo } from "react";
import { AdminSupportConversationFromList } from "@entities/support";
import AvatarIcon from "public/icons/avatar.svg";
import { getFullName } from "@shared/utils";
import { Paragraph } from "@shared/ui";
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
                    <Avatar src={data.profile.avatar?.absolutePath} alt="avatar" className={classes.avatarWrapper}>
                        <ThemeIcon className={classes.avatarDefaultIconWrapper}>
                            <AvatarIcon />
                        </ThemeIcon>
                    </Avatar>
                    <Flex className={classes.userInfo}>
                        <Box className={classes.textWrapper}>
                            <Paragraph variant="text-small-m" className={classes.userFullName}>
                                {getFullName({ data: data.profile })}
                            </Paragraph>
                        </Box>
                        <Paragraph variant="text-caption" className={classes.createdAtLastMessage} color="gray45">
                            {data.lastSupportMessage ? getFormatCreatedAt(data.lastSupportMessage.createdAt) : "-"}
                        </Paragraph>
                    </Flex>
                </Flex>

                <Box className={classes.textWrapper}>
                    <Paragraph variant="text-caption" className={classes.lastMesssageContent}>
                        {data.lastSupportMessage?.message}
                    </Paragraph>
                </Box>
            </Flex>
        </Indicator>
    );
});

export default MemoizedChatItem;
