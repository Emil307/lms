import { Box, Flex, ScrollArea, ThemeIcon } from "@mantine/core";
import React, { useEffect, useMemo, useRef } from "react";
import { Heading, Loader } from "@shared/ui";
import { useLessonHomeworkAnswerMessages } from "@entities/lesson";
import IconMessagesChat from "public/icons/messagesChat.svg";
import { useIntersection } from "@shared/utils";
import { DateDivider, MessageItem, CreateMessageForm, EmptyBlock } from "./components";
import { initialParams } from "./constants";
import useStyles from "./HomeworkChat.styles";

export interface MessageListProps {
    homeworkAnswerId: string;
    courseId: string;
    answerIsCompleted: boolean;
}

const HomeworkChat = ({ homeworkAnswerId, courseId, answerIsCompleted }: MessageListProps) => {
    const { classes } = useStyles();
    const containerRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);

    const scrollToTop = () => viewportRef.current?.scrollTo({ top: 0, behavior: "smooth" });

    const {
        data: messagesData,
        hasNextPage,
        fetchNextPage,
        isLoading,
        isFetching,
        isRefetching,
    } = useLessonHomeworkAnswerMessages({ ...initialParams, homeworkAnswerId, courseId });

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        scrollToTop();
    }, [isRefetching]);

    useEffect(() => {
        if (!isLoading && entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    const messages = useMemo(() => {
        if (!messagesData?.data.length) {
            return null;
        }
        return (
            <Flex className={classes.messageContainer}>
                {messagesData.data.map((message, index) => {
                    return (
                        <Box key={message.id} ref={index === messagesData.data.length - 1 ? lastElemRef : null}>
                            {messagesData.data[index - 1]?.createdAt.getDate() !== message.createdAt.getDate() && (
                                <DateDivider date={message.createdAt} />
                            )}
                            <MessageItem data={message} w="fit-content" />
                        </Box>
                    );
                })}
            </Flex>
        );
    }, [messagesData]);

    if (isLoading) {
        return <Loader />;
    }

    if (!messagesData?.data.length && answerIsCompleted) {
        return <EmptyBlock />;
    }

    return (
        <Flex className={classes.root}>
            {!answerIsCompleted && (
                <>
                    <Flex gap={8} mb={32}>
                        <ThemeIcon>
                            <IconMessagesChat />
                        </ThemeIcon>
                        <Heading order={3}>Диалог с преподавателем</Heading>
                    </Flex>

                    <Box maw={728} mb={32}>
                        <CreateMessageForm homeworkAnswerId={homeworkAnswerId} courseId={courseId} />
                    </Box>
                </>
            )}
            <ScrollArea.Autosize
                maxHeight={550}
                style={{ height: "100%", width: "100%" }}
                type="auto"
                offsetScrollbars
                viewportRef={viewportRef}
                hidden={!messages}
                scrollbarSize={4}>
                {messages}
                <Box ref={containerRef} />
                {(isFetching || isRefetching) && <Loader />}
            </ScrollArea.Autosize>
        </Flex>
    );
};

export default HomeworkChat;
