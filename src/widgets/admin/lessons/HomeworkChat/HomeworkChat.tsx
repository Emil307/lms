import { Box, Flex, ScrollArea } from "@mantine/core";
import React, { useEffect, useMemo, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { Heading, Loader } from "@shared/ui";
import { useAdminLessonHomeworkAnswerMessages } from "@entities/lesson";
import { useUserRole } from "@entities/auth/hooks";
import { Roles } from "@app/routes";
import { DateDivider, MessageItem, CreateMessageForm, EmptyBlock } from "./components";
import { initialParams } from "./constants";
import useStyles from "./HomeworkChat.styles";

export interface MessageListProps {
    homeworkAnswerId: string;
    answerIsCompleted: boolean;
}

const HomeworkChat = ({ homeworkAnswerId, answerIsCompleted }: MessageListProps) => {
    const { classes } = useStyles();
    const containerRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);

    const { ref: lastElemRef, entry } = useIntersection();

    const userRole = useUserRole();

    const scrollToTop = () => viewportRef.current?.scrollTo({ top: 0, behavior: "smooth" });

    const {
        data: messagesData,
        hasNextPage,
        fetchNextPage,
        isLoading,
        isFetching,
        isRefetching,
    } = useAdminLessonHomeworkAnswerMessages({ ...initialParams, homeworkAnswerId });

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
                    <Heading order={2} mb={32}>
                        Диалог с учеником
                    </Heading>
                    {userRole === Roles.teacher && (
                        <Box maw={772} mb={32}>
                            <CreateMessageForm homeworkAnswerId={homeworkAnswerId} />
                        </Box>
                    )}
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
