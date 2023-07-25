import { Flex, FlexProps, Indicator } from "@mantine/core";
import { memo } from "react";
import { getFullName } from "@shared/utils";
import { NotificationFromList } from "@entities/notification";
import { Paragraph } from "@shared/ui";
import { Roles } from "@app/routes";
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
                <Paragraph variant="text-caption" color="gray45" lineClamp={1}>
                    Администрация
                </Paragraph>
            );
        }
        return (
            <Flex gap={8}>
                <Paragraph variant="text-caption" color="gray45" lineClamp={1}>
                    {getFullName({ data: data.sender.profile })}
                </Paragraph>
                <Paragraph variant="text-caption" color="gray45" lineClamp={1}>
                    {data.sender.roles[0].displayName}
                </Paragraph>
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
                            <Paragraph variant="text-small-m">{getNameTypeNotification(data.type)}</Paragraph>
                            <Paragraph variant="text-caption" className={classes.createdAtNotification}>
                                {getFormatCreatedAt(data.createdAt)}
                            </Paragraph>
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
