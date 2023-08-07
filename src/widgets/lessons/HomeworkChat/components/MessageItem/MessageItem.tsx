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
        <Indicator
            size={8}
            offset={16}
            position="top-start"
            color="done"
            //TODO: Добавить условие отображения индикатора как бек добавит эту возможность https://addamant.planfix.ru/task/97190/?comment=8749753
            disabled
            // disabled={!data.hasSupportMessage}
        >
            <Flex {...props} className={classes.root}>
                <Flex align="center" gap={8}>
                    <Avatar
                        src={data.sender.profile.avatar?.absolutePath}
                        alt="avatar"
                        w={32}
                        h={32}
                        miw={32}
                        radius={160}
                        styles={(theme) => ({
                            placeholder: { backgroundColor: theme.colors.grayLight[0] },
                        })}>
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
