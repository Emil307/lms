import { Avatar, Flex, FlexProps, ThemeIcon, Text } from "@mantine/core";
import { memo } from "react";
import { AdminSupportMessageFromList } from "@entities/support";
import AvatarIcon from "public/icons/avatar.svg";
import { getFullName } from "@shared/utils";
import useStyles from "./MessageItem.styles";
import { getFormatCreatedAt } from "./utils";

export interface MessageItemProps extends Omit<FlexProps, "onClick"> {
    data: AdminSupportMessageFromList;
}

const MemoizedMessageItem = memo(function MessageItem({ data, ...props }: MessageItemProps) {
    const { classes } = useStyles();

    return (
        <Flex {...props} className={classes.root}>
            <Flex align="center" gap={8}>
                <Avatar
                    src={data.user.profile.avatar?.absolutePath}
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
                        {getFullName({ data: data.user.profile })}
                    </Text>
                    <Text className={classes.createdAtLastMessage}>{getFormatCreatedAt(data.createdAt)}</Text>
                </Flex>
            </Flex>

            <Text className={classes.messageContent}>{data.message}</Text>
        </Flex>
    );
});

export default MemoizedMessageItem;
