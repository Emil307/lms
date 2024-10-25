import { Box, Flex, FlexProps, Indicator } from "@mantine/core";
import { memo } from "react";
import { useRouter } from "next/router";
import { getFullName } from "@shared/utils";
import { NotificationFromList } from "@entities/notification";
import { Paragraph } from "@shared/ui";
import { useUserRole } from "@entities/auth";
import useStyles from "./Card.styles";
import { getFormatCreatedAt, prepareNotificationData } from "./utils";
import { NotificationIcon } from "./components";

export interface CardProps extends FlexProps {
    data: NotificationFromList;
    handleCloseMenu: () => void;
}

const MemoizedCard = memo(function Card({ data, handleCloseMenu, ...props }: CardProps) {
    const { classes } = useStyles();
    const router = useRouter();
    const userRole = useUserRole();

    const { userData, content, title, link } = prepareNotificationData(data, userRole?.name);

    const handleNotificationClick = () => {
        handleCloseMenu();
        router.push(link);
    };

    return (
        <Indicator size={8} offset={16} position="top-start" color="secondary" disabled={!data.isNew}>
            <Flex {...props} className={classes.root} onClick={handleNotificationClick}>
                <Flex gap={8}>
                    <NotificationIcon data={data} />
                    <Flex direction="column" sx={{ flex: 1 }}>
                        <Flex justify="space-between">
                            <Box className={classes.contentWrapper}>
                                <Paragraph className={classes.content} variant="text-small-m">
                                    {title}
                                </Paragraph>
                            </Box>
                            <Paragraph variant="text-caption" className={classes.createdAt} color="neutralMain50">
                                {getFormatCreatedAt(data.createdAt)}
                            </Paragraph>
                        </Flex>
                        <Flex gap={8}>
                            <Box className={classes.contentWrapper}>
                                <Paragraph variant="text-caption" color="neutralMain50" className={classes.content}>
                                    {getFullName({ data: userData?.profile, hidePatronymic: true })}
                                </Paragraph>
                            </Box>
                            <Paragraph variant="text-caption" color="neutralMain50" className={classes.userRole}>
                                {userData?.roles[0].displayName}
                            </Paragraph>
                        </Flex>
                    </Flex>
                </Flex>

                <Box className={classes.contentWrapper}>
                    <Paragraph variant="text-caption" className={classes.content}>
                        {content}
                    </Paragraph>
                </Box>
            </Flex>
        </Indicator>
    );
});

export default MemoizedCard;
