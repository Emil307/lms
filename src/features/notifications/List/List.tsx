import { Box, Flex, FlexProps, Loader, ScrollArea, Text } from "@mantine/core";
import { ReactNode, useEffect, useMemo } from "react";
import { NotificationFromList, useNotifications } from "@entities/notification";
import { useIntersection } from "@shared/utils";
import { initialParams } from "./constants";
import useStyles from "./List.styles";

export interface ListProps extends Omit<FlexProps, "children" | "onSelect"> {
    maxHeightContainer: number;
    itemComponent: ({ data }: { data: NotificationFromList }) => ReactNode;
}

const List = ({ maxHeightContainer, itemComponent, ...props }: ListProps) => {
    const { classes } = useStyles();
    const { data: notificationsData, hasNextPage, fetchNextPage, isLoading, isFetching, isRefetching } = useNotifications(initialParams);
    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    const renderItems = useMemo(() => {
        return notificationsData?.data.map((notification) => (
            <Box key={String(notification.id)} ref={lastElemRef}>
                {itemComponent({ data: notification })}
            </Box>
        ));
    }, [notificationsData]);

    if (!notificationsData?.data.length && !isLoading) {
        return <Text className={classes.nothingFoundTitle}>У вас пока нет новых уведомлений</Text>;
    }

    return (
        <Flex className={classes.root} {...props}>
            <ScrollArea.Autosize
                className={classes.scrollArea}
                maxHeight={maxHeightContainer}
                type="auto"
                offsetScrollbars
                scrollbarSize={4}>
                <Flex direction="column" gap={2}>
                    {renderItems}
                </Flex>

                {(isLoading || isFetching || isRefetching) && <Loader w="100%" pt={8} />}
            </ScrollArea.Autosize>
        </Flex>
    );
};

export default List;
