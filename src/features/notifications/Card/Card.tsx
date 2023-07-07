import { Flex, FlexProps, Text, Indicator } from "@mantine/core";
import { memo } from "react";
import { getFullName } from "@shared/utils";
import { NotificationFromList } from "@entities/notification";
import { Roles } from "@entities/role";
import useStyles from "./Card.styles";
import { getFormatCreatedAt, getNameTypeNotification } from "./utils";
import { NotificationIcon } from "./components";

export interface CardProps extends FlexProps {
    data: NotificationFromList;
}

const MemoizedCard = memo(function Card({ data, ...props }: CardProps) {
    const { classes } = useStyles();

    const renderSenderInfo = () => {
        if (data.type === "supportMessage" && data.sender.roles[0].id === Roles.administrator) {
            return (
                <Text className={classes.senderFullName} lineClamp={1}>
                    Администрация
                </Text>
            );
        }
        return (
            <Flex gap={8}>
                <Text className={classes.senderFullName} lineClamp={1}>
                    {getFullName({ data: data.sender.profile })}
                </Text>
                <Text className={classes.roleName} lineClamp={1}>
                    {data.sender.roles[0].displayName}
                </Text>
            </Flex>
        );
    };

    return (
        <Indicator size={8} offset={16} position="top-start" color="done" disabled={!data.isNew}>
            <Flex {...props} className={classes.root}>
                <Flex gap={8}>
                    <NotificationIcon data={data} />
                    <Flex direction="column" sx={{ flex: 1 }}>
                        <Flex justify="space-between">
                            <Text className={classes.notificationType}>{getNameTypeNotification(data.type)}</Text>
                            <Text className={classes.createdAtNotification}>{getFormatCreatedAt(data.createdAt)}</Text>
                        </Flex>
                        {renderSenderInfo()}
                    </Flex>
                </Flex>

                {/* //TODO: Добавить название курса, как бекенд добавить уведомления относительно курсов */}
                {/* <Text className={classes.courseName} lineClamp={1}>
                </Text> */}
            </Flex>
        </Indicator>
    );
});

export default MemoizedCard;
