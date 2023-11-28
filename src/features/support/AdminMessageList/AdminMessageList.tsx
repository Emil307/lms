import { Box, Flex, FlexProps, ScrollArea } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useMemo, useRef } from "react";
import { AdminSupportConversationFromList, useAdminSupportMessages } from "@entities/support";
import { Loader } from "@shared/ui";
import { DateDivider, EmptyBlock, MessageItem } from "./components";
import { initialParams } from "./constants";
import useStyles from "./AdminMessageList.styles";

export interface AdminMessageListProps extends Omit<FlexProps, "onSelect"> {
    conversation: AdminSupportConversationFromList | null;
    variant?: "default" | "reverse";
    maxHeightContainer: number;
    scrollToLastMessage: boolean;
    setScrollToLastMessage: (value: boolean) => void;
}

const AdminMessageList = ({
    conversation,
    variant,
    maxHeightContainer,
    scrollToLastMessage,
    setScrollToLastMessage,
    children,
    ...props
}: AdminMessageListProps) => {
    const { classes } = useStyles({ variant });
    const containerRef = useRef<HTMLDivElement>(null);
    const {
        data: messagesData,
        hasNextPage,
        fetchNextPage,
        isLoading,
        isFetching,
        isRefetching,
    } = useAdminSupportMessages({ ...initialParams, conversationId: conversation?.supportConversation.id });

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (!messagesData?.data) {
            return;
        }
        if (scrollToLastMessage) {
            containerRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
            setScrollToLastMessage(false);
        }
    }, [messagesData?.data]);

    useEffect(() => {
        if (!isLoading && entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    const renderItems = useMemo(
        () =>
            messagesData?.data.reverse().map((message, index) => {
                return (
                    <Box key={message.id} ref={index === 0 ? lastElemRef : null}>
                        {messagesData.data[index - 1]?.createdAt.getDate() !== message.createdAt.getDate() && (
                            <DateDivider date={message.createdAt} />
                        )}
                        <MessageItem data={message} w="fit-content" />
                    </Box>
                );
            }),
        [messagesData]
    );

    if (!conversation) {
        return <EmptyBlock />;
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Flex className={classes.root} {...props}>
            <ScrollArea.Autosize
                maxHeight={maxHeightContainer}
                style={{ height: "100%", width: "100%" }}
                type="auto"
                offsetScrollbars
                scrollbarSize={4}>
                {(isFetching || isRefetching) && <Loader />}
                <Flex className={classes.messageContainer}>{renderItems}</Flex>
                <Box ref={containerRef} />
            </ScrollArea.Autosize>
            {children}
        </Flex>
    );
};

export default AdminMessageList;
