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
}

const MessageList = ({ variant, maxHeightContainer, children, ...props }: MessageListProps) => {
    const { classes } = useStyles({ variant });
    const containerRef = useRef<HTMLDivElement>(null);
    const { data: messagesData, hasNextPage, fetchNextPage, isLoading, isFetching, isRefetching } = useSupportMessages(initialParams);

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        containerRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
    }, [isLoading]);

    useEffect(() => {
        if (!isLoading && entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    const renderContent = useMemo(
        () => (
            <ScrollArea.Autosize
                maxHeight={maxHeightContainer}
                style={{ height: "100%", width: "100%" }}
                sx={{ "> div": { justifyContent: "flex-end" } }}
                type="auto"
                offsetScrollbars
                scrollbarSize={4}>
                {(isFetching || isRefetching) && <Loader />}
                <Flex className={classes.messageContainer}>
                    {messagesData?.data.reverse().map((message, index) => {
                        return (
                            <Box key={message.id} ref={index === 0 ? lastElemRef : null}>
                                <MessageItem data={message} w="fit-content" />
                            </Box>
                        );
                    })}
                </Flex>
                <Box ref={containerRef} />
            </ScrollArea.Autosize>
        ),
        [messagesData]
    );

    if (isLoading) {
        return <Loader sx={{ alignItems: "center", height: 456 }} />;
    }

    return (
        <Flex className={classes.root} {...props}>
            {!messagesData?.data.length ? <EmptyBlock /> : renderContent}
            {children}
        </Flex>
    );
};

export default MessageList;
