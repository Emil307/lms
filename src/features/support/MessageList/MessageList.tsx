import { Box, Flex, FlexProps, ScrollArea } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useMemo, useRef } from "react";
import { useSupportMessages } from "@entities/support";
import { Loader } from "@shared/ui";
import { EmptyBlock, MessageItem } from "./components";
import { initialParams } from "./constants";
import useStyles from "./MessageList.styles";

export interface MessageListProps extends Omit<FlexProps, "onSelect"> {
    variant?: "default" | "reverse";
    maxHeightContainer: number;
    scrollAfterSendMessage: boolean;
    setScrollAfterSendMessage: (value: boolean) => void;
}

const MessageList = ({
    variant,
    maxHeightContainer,
    scrollAfterSendMessage,
    setScrollAfterSendMessage,
    children,
    ...props
}: MessageListProps) => {
    const { classes } = useStyles({ variant });
    const containerRef = useRef<HTMLDivElement>(null);
    const { data: messagesData, hasNextPage, fetchNextPage, isLoading, isFetching, isRefetching } = useSupportMessages(initialParams);

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (!messagesData?.data) {
            return;
        }
        if (scrollAfterSendMessage) {
            containerRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
            setScrollAfterSendMessage(false);
        }
    }, [messagesData?.data]);

    useEffect(() => {
        if (!isLoading && entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    const renderContent = useMemo(
        () =>
            messagesData?.data.reverse().map((message, index) => (
                <Box key={message.id} ref={index === 0 ? lastElemRef : null}>
                    <MessageItem data={message} w="fit-content" />
                </Box>
            )),
        [messagesData]
    );

    if (isLoading) {
        return <Loader sx={{ alignItems: "center", height: 456 }} />;
    }

    return (
        <Flex className={classes.root} {...props}>
            {!messagesData?.data.length ? (
                <EmptyBlock />
            ) : (
                <ScrollArea.Autosize
                    maxHeight={maxHeightContainer}
                    style={{ height: "100%", width: "100%" }}
                    sx={{ "> div": { justifyContent: "flex-end" } }}
                    type="auto"
                    offsetScrollbars
                    scrollbarSize={4}>
                    {(isFetching || isRefetching) && <Loader />}
                    <Flex className={classes.messageContainer}>{renderContent}</Flex>
                    <Box ref={containerRef} />
                </ScrollArea.Autosize>
            )}
            {children}
        </Flex>
    );
};

export default MessageList;
