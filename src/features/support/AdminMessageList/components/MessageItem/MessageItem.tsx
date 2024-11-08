import { Avatar, Flex, FlexProps, ThemeIcon } from "@mantine/core";
import { memo } from "react";
import { AdminSupportMessageFromList } from "@entities/support";
import AvatarIcon from "public/icons/avatar.svg";
import { getFullName } from "@shared/utils";
import { Paragraph } from "@shared/ui";
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
                <Avatar src={data.user.profile.avatar?.absolutePath} alt="avatar" className={classes.avatarWrapper}>
                    <ThemeIcon className={classes.avatarDefaultIconWrapper}>
                        <AvatarIcon />
                    </ThemeIcon>
                </Avatar>
                <Flex className={classes.userInfo}>
                    <Paragraph variant="small-semi" lineClamp={1}>
                        {getFullName({ data: data.user.profile })}
                    </Paragraph>
                    <Paragraph variant="text-caption" className={classes.createdAtLastMessage}>
                        {getFormatCreatedAt(data.createdAt)}
                    </Paragraph>
                </Flex>
            </Flex>
            <Paragraph variant="text-small-m">{data.message}</Paragraph>
        </Flex>
    );
});

export default MemoizedMessageItem;
